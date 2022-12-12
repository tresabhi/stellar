import { Line } from '@react-three/drei';
import { invalidate, ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { mutateBlueprint } from 'core/blueprint';
import { deferUpdates, undeferUpdates } from 'core/bounds';
import { resizePartAsync } from 'core/part/resizePartAsync';
import { PartWithPosition } from 'game/parts/PartWithPosition';
import { PartWithScale } from 'game/parts/PartWithScale';
import { FC, MutableRefObject, useEffect, useRef } from 'react';
import useBlueprint from 'stores/blueprint';
import { Bounds } from 'stores/bounds';
import { Group, LineBasicMaterial, Vector2, Vector2Tuple } from 'three';
import snap from 'utilities/snap';
import { UpdateResizeNodesDetail } from '..';
import { UNIT_POINTS } from '../../PartsBounds/components/PartBounds';

/**
 * WARNING!
 *
 * THE CODE HERE IS VERY UGLY AND MAY CAUSE TRAUMA AND/OR STROKE(S)
 * READERS BEWARE, I PHYSICALLY CRIED YESTERDAY WRITING THIS
 *
 * DON'T ASK ME WHY I HAD TO NORMALIZE THE OFFSETS AND SCALES
 * THE MATH MAKES SENSE EITHER WAY AND IT WORKS
 * (┬┬﹏┬┬)
 */

export interface ResizeNodeProps {
  bounds: MutableRefObject<Bounds>;
  constant: Vector2Tuple;
  movable: Vector2Tuple;
  hideOnMaintainSlope?: boolean;
}

export const CANVAS_MATRIX_SCALE = new Vector2(1, -1);
const ORIGIN = new Vector2();
const SNAP_SIZE = 1 / 5; // TODO: unify all these snaps
const STEP = 1 / 10 ** 8;

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

const NODE_SIZE = 10;
const NODE_COLOR = '#eeedef';

export const borderMaterial = new LineBasicMaterial({
  color: '#8f8f8f',
});

export const ResizeNode: FC<ResizeNodeProps> = ({
  bounds,
  constant: constantSide,
  movable: movableSide,
  hideOnMaintainSlope = false,
}) => {
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
  let maintainSlope = false;

  const applyNormalizations = () => {
    normalizedMovable
      .copy(movable)
      .rotateAround(ORIGIN, -bounds.current.rotation);
    normalizedMoved.copy(moved).rotateAround(ORIGIN, -bounds.current.rotation);
    normalizedSize.copy(normalizedMovable).sub(normalizedConstant);
    normalizedScale.copy(normalizedMoved).sub(normalizedConstant);

    normalizedScale.x =
      snap(normalizedSize.x, STEP) === 0
        ? 1
        : normalizedScale.x / normalizedSize.x;
    normalizedScale.y =
      snap(normalizedSize.y, STEP) === 0
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

  const updateResizeNode = () => {
    updateValues();

    wrapper.current?.position.set(...moved.toArray(), 2);
    wrapper.current?.rotation.set(0, 0, bounds.current.rotation);
  };
  updateResizeNode();

  useFrame(({ camera }) => {
    const scale = (1 / camera.zoom) * NODE_SIZE;
    wrapper.current?.scale.set(scale, scale, scale);
  });
  useEffect(() => {
    const handleUpdateResizeNodes = (
      event: CustomEvent<UpdateResizeNodesDetail>,
    ) => {
      maintainSlope = event.detail.maintainSlope;

      if (hideOnMaintainSlope && wrapper.current) {
        wrapper.current.visible = !maintainSlope;
      }

      updateResizeNode();
    };

    window.addEventListener(
      'updateresizenodes',
      handleUpdateResizeNodes as EventListener,
    );

    return () => {
      window.removeEventListener(
        'updateresizenodes',
        handleUpdateResizeNodes as EventListener,
      );
    };
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    updateValues();

    initial.set(event.clientX, event.clientY);

    firstMove = true;
    blueprint = useBlueprint.getState();
    selections = blueprint.selections.filter((selection) => {
      const part = blueprint.parts[selection];

      return (
        (part as PartWithPosition).p !== undefined &&
        (part as PartWithScale).o !== undefined
      );
    });

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };
  const handlePointerMove = (event: PointerEvent) => {
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
      .divideScalar(camera.zoom)
      .divideScalar(SNAP_SIZE)
      .round()
      .multiplyScalar(SNAP_SIZE);

    if (maintainSlope) {
      const pointerX = offset.x + movable.x;
      const pointerY = offset.y + movable.y;

      const slope = (movable.y - constant.y) / (movable.x - constant.x);
      const perpendicular = -1 / slope;

      const movedX = isFinite(slope)
        ? isFinite(perpendicular)
          ? (-constant.x * slope +
              pointerX * perpendicular +
              constant.y -
              pointerY) /
            (perpendicular - slope)
          : pointerX
        : constant.x;
      const movedY = isFinite(slope)
        ? isFinite(perpendicular)
          ? (-constant.x * perpendicular * slope +
              pointerX * perpendicular * slope +
              constant.y * perpendicular -
              pointerY * slope) /
            (perpendicular - slope)
          : constant.y
        : pointerY;

      offset.set(movedX, movedY).sub(movable);
    }

    applyNormalizations();

    if (!offset.equals(lastOffset)) {
      selections.forEach((selection) => {
        resizePartAsync(
          selection,
          normalizedConstant.toArray(),
          normalizedScale.toArray(),
          bounds.current.rotation,
        );
      });
    }

    invalidate();
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

    if (!firstMove) undeferUpdates();

    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  };

  return (
    <group ref={wrapper} onPointerDown={handlePointerDown}>
      <mesh>
        <planeGeometry />
        <meshBasicMaterial color={NODE_COLOR} />
      </mesh>

      <Line
        position={[0, 0, 2]}
        color={'#8f8f8f'}
        points={UNIT_POINTS}
        lineWidth={2}
      />
    </group>
  );
};
