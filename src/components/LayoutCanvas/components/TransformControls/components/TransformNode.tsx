import { invalidate, ThreeEvent, useThree } from '@react-three/fiber';
import ControlDiamond from 'components/ControlDiamond';
import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import deferUpdates from 'core/bounds/deferUpdates';
import declareInteractingWithPart from 'core/interface/declareInteractingWithPart';
import filter from 'core/part/filter';
import getChildrenRecursive from 'core/part/getChildrenRecursive';
import transformAsync from 'core/part/resizeAsync';
import { PartWithPosition } from 'game/parts/PartWithPosition';
import { PartWithScale } from 'game/parts/PartWithScale';
import { MutableRefObject, useEffect, useRef } from 'react';
import useApp, { Tool } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import { Bounds } from 'stores/bounds';
import { Group, Vector2, Vector2Tuple } from 'three';
import stepped from 'utilities/stepped';
import { UpdateTransformNodesDetail } from '..';

export interface TransformNodeProps {
  bounds: MutableRefObject<Bounds>;
  constant: Vector2Tuple;
  movable: Vector2Tuple;
  hideOnMaintainSlope?: boolean;
}

export const CANVAS_MATRIX_SCALE = new Vector2(1, -1);
const ORIGIN = new Vector2();

export const SNAP_SIZE = 1 / 5;

export const sideToPoint = (
  bounds: Bounds,
  side: Vector2Tuple,
): Vector2Tuple => {
  const offsetXOriginal = bounds.width * (side[0] / 2);
  const offsetYOriginal = bounds.height * (side[1] / 2);
  const hypotenuse = Math.hypot(offsetXOriginal, offsetYOriginal);
  const rotationOriginal = Math.atan2(offsetYOriginal, offsetXOriginal);
  const rotation = rotationOriginal + bounds.rotation;
  const offsetX = hypotenuse * Math.cos(rotation);
  const offsetY = hypotenuse * Math.sin(rotation);
  const x = bounds.x + offsetX;
  const y = bounds.y + offsetY;

  return [x, y];
};

export default function TransformNode({
  bounds,
  constant: constantSide,
  movable: movableSide,
  hideOnMaintainSlope,
}: TransformNodeProps) {
  let firstMove = true;
  const camera = useThree((state) => state.camera);
  const wrapper = useRef<Group>(null);
  const constant = new Vector2();
  const movable = new Vector2();
  const moved = new Vector2();
  const normalizedConstant = new Vector2();
  const normalizedMovable = new Vector2();
  const normalizedMoved = new Vector2();
  const normalizedSize = new Vector2();
  const normalizedScale = new Vector2();
  const initial = new Vector2();
  const offset = new Vector2();
  const lastOffset = new Vector2();
  let blueprint = useBlueprint.getState();
  let selections: string[] = [];
  const maintainSlope = useRef(false);

  const applyNormalizations = () => {
    normalizedMovable
      .copy(movable)
      .rotateAround(ORIGIN, -bounds.current.rotation);
    normalizedMoved.copy(moved).rotateAround(ORIGIN, -bounds.current.rotation);
    normalizedSize.copy(normalizedMovable).sub(normalizedConstant);
    normalizedScale.copy(normalizedMoved).sub(normalizedConstant);

    normalizedScale.x =
      stepped(normalizedSize.x, 1 / 10 ** 8) === 0
        ? 1
        : normalizedScale.x / normalizedSize.x;
    normalizedScale.y =
      stepped(normalizedSize.y, 1 / 10 ** 8) === 0
        ? 1
        : normalizedScale.y / normalizedSize.y;
  };
  const updateValues = () => {
    constant.set(...sideToPoint(bounds.current, constantSide));
    movable.set(...sideToPoint(bounds.current, movableSide));
    moved.copy(movable);
    normalizedConstant
      .copy(constant)
      .rotateAround(ORIGIN, -bounds.current.rotation);
    normalizedSize.set(1, 1);
    offset.set(0, 0);
    lastOffset.copy(offset);

    applyNormalizations();
  };
  const updateTransformNode = () => {
    updateValues();

    wrapper.current?.position.set(...moved.toArray(), 2);
    wrapper.current?.rotation.set(0, 0, bounds.current.rotation);
  };
  updateTransformNode();

  useEffect(() => {
    const handleUpdateTransformNodes = (
      event: CustomEvent<UpdateTransformNodesDetail>,
    ) => {
      maintainSlope.current = event.detail.maintainSlope;

      if (hideOnMaintainSlope && wrapper.current) {
        wrapper.current.visible = !maintainSlope.current;
      }

      updateTransformNode();
    };

    window.addEventListener(
      'updatetransformnodes',
      handleUpdateTransformNodes as EventListener,
    );

    return () => {
      window.removeEventListener(
        'updatetransformnodes',
        handleUpdateTransformNodes as EventListener,
      );
    };
  });

  const handlePointerMove = (event: PointerEvent) => {
    const { snap, scaleWithRatio } = useApp.getState().editor;

    if (firstMove) {
      firstMove = false;
      deferUpdates();
    }

    moved.copy(movable).add(offset);
    lastOffset.copy(offset);

    offset
      .set(event.clientX, event.clientY)
      .sub(initial)
      .multiply(CANVAS_MATRIX_SCALE)
      .divideScalar(camera.zoom);

    if (!(event.ctrlKey || !snap) && !(event.shiftKey || scaleWithRatio)) {
      offset.divideScalar(SNAP_SIZE).round().multiplyScalar(SNAP_SIZE);
    }

    if (maintainSlope.current || event.shiftKey || scaleWithRatio) {
      const pointerX = offset.x + movable.x;
      const pointerY = offset.y + movable.y;

      const slope = (movable.y - constant.y) / (movable.x - constant.x);
      const perpendicular = -1 / slope;

      let movedX = 0;
      let movedY = 0;

      if (Number.isFinite(slope)) {
        if (Number.isFinite(perpendicular)) {
          movedX =
            (-constant.x * slope +
              pointerX * perpendicular +
              constant.y -
              pointerY) /
            (perpendicular - slope);
        } else {
          movedX = pointerX;
        }
      } else {
        movedX = constant.x;
      }

      if (Number.isFinite(slope)) {
        if (Number.isFinite(perpendicular)) {
          movedY =
            (-constant.x * perpendicular * slope +
              pointerX * perpendicular * slope +
              constant.y * perpendicular -
              pointerY * slope) /
            (perpendicular - slope);
        } else {
          movedY = constant.y;
        }
      } else {
        movedY = pointerY;
      }

      offset.set(movedX, movedY).sub(movable);

      if (!event.ctrlKey && snap) {
        offset.divideScalar(SNAP_SIZE).round().multiplyScalar(SNAP_SIZE);
      }
    }

    applyNormalizations();

    if (!offset.equals(lastOffset)) {
      transformAsync(
        selections,
        normalizedConstant.toArray(),
        normalizedScale.toArray(),
        bounds.current.rotation,
      );

      invalidate();
    }
  };
  const handlePointerUp = () => {
    if (offset.length() > 0) {
      mutateBlueprint((draft) => {
        selections.forEach((selection) => {
          const part = draft.parts[selection];

          if (
            (part as PartWithPosition).p !== undefined &&
            (part as PartWithScale).o !== undefined
          ) {
            (part as PartWithScale).o.x *= normalizedScale.x;
            (part as PartWithScale).o.y *= normalizedScale.y;

            const originOffset = Math.hypot(
              (part as PartWithPosition).p.x,
              (part as PartWithPosition).p.y,
            );
            const originAngle =
              Math.atan2(
                (part as PartWithPosition).p.y,
                (part as PartWithPosition).p.x,
              ) - bounds.current.rotation;
            const rotatedOriginX = originOffset * Math.cos(originAngle);
            const rotatedOriginY = originOffset * Math.sin(originAngle);
            const offsetX = rotatedOriginX - normalizedConstant.x;
            const offsetY = rotatedOriginY - normalizedConstant.y;
            const scaledOffsetX =
              offsetX * normalizedScale.x + normalizedConstant.x;
            const scaledOffsetY =
              offsetY * normalizedScale.y + normalizedConstant.y;
            const scaledOffset = Math.hypot(scaledOffsetX, scaledOffsetY);
            const scaledAngle =
              Math.atan2(scaledOffsetY, scaledOffsetX) +
              bounds.current.rotation;
            const x = scaledOffset * Math.cos(scaledAngle);
            const y = scaledOffset * Math.sin(scaledAngle);

            (part as PartWithPosition).p.x = x;
            (part as PartWithPosition).p.y = y;
          }
        });
      });

      invalidate();
    }

    if (!firstMove) deferUpdates(false);
    declareInteractingWithPart(false);

    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  };
  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    if (useApp.getState().editor.tool === Tool.Transform) {
      event.stopPropagation();
      updateValues();
      declareInteractingWithPart();

      initial.set(event.clientX, event.clientY);

      firstMove = true;
      blueprint = useBlueprint.getState();
      selections = filter(
        getChildrenRecursive(blueprint.selections),
        (part) =>
          !part.locked &&
          part.visible &&
          (part as PartWithPosition).p !== undefined &&
          (part as PartWithScale).o !== undefined,
      );

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }
  };

  return <ControlDiamond ref={wrapper} onPointerDown={handlePointerDown} />;
}
