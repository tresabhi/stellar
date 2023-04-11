import { ThreeEvent, useThree } from '@react-three/fiber';
import ControlNode from 'components/ControlNode';
import mutateBlueprint from 'core/blueprint/mutateBlueprint';
import deferUpdates from 'core/bounds/deferUpdates';
import getBoundsFromParts from 'core/bounds/getBoundsFromParts';
import declareInteractingWithPart from 'core/interface/declareInteractingWithPart';
import getPart from 'core/part/getPart';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { useRef } from 'react';
import useApp, { Tool } from 'stores/app';
import { Bounds } from 'stores/bounds';
import { Group, Vector2, Vector2Tuple } from 'three';
import { ORIGIN } from '../../EditControls/components/FuelTankControls';

export interface PartTransformEventDetail {
  scale: Vector2Tuple;
  constant: Vector2Tuple;
  rotation: number;
}

export interface TransformNodeProps {
  bounds: ReturnType<typeof getBoundsFromParts>;
  position: Vector2Tuple;
  selections: string[];
}

export const CANVAS_MATRIX_SCALE = new Vector2(1, -1);

export const POSITION_SNAP_SIZE = 1 / 5;

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
  bounds: { bounds, hasMutualAngle },
  position: positionTuple,
  selections,
}: TransformNodeProps) {
  const camera = useThree((state) => state.camera);
  const node = useRef<Group>(null);
  const initial = new Vector2();
  const offsetCardinal = new Vector2();
  const offsetParallel = new Vector2();
  const center = new Vector2(bounds.x, bounds.y);
  const size = new Vector2(bounds.width, bounds.height);
  const scale = new Vector2(1, 1);
  const position = new Vector2(...positionTuple);
  const movable = new Vector2(
    bounds.width * position.x,
    bounds.height * position.y,
  ).divideScalar(2);
  const constant = movable.clone().multiplyScalar(-1);
  let firstMove = true;

  movable.rotateAround(ORIGIN, bounds.rotation).add(center);
  constant.rotateAround(ORIGIN, bounds.rotation).add(center);

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    const { tool, isSpacePanning, isTouchPanning } = useApp.getState().editor;

    if (tool === Tool.Transform && !isSpacePanning && !isTouchPanning) {
      event.stopPropagation();

      initial.set(event.clientX, event.clientY);
      offsetCardinal.set(0, 0);
      offsetParallel.copy(offsetCardinal);
      scale.set(1, 1);
      firstMove = true;

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      window.addEventListener('pointermove', handlePointerMove);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      window.addEventListener('pointerup', handlePointerUp);
    }
  };
  const handlePointerMove = (event: PointerEvent) => {
    const { scaleWithRatio, snap } = useApp.getState().editor;

    if (firstMove) {
      firstMove = false;
      deferUpdates();
      declareInteractingWithPart();
    }

    offsetCardinal
      .set(event.clientX, event.clientY)
      .sub(initial)
      .multiply(CANVAS_MATRIX_SCALE)
      .divideScalar(camera.zoom);

    if (!(event.ctrlKey || !snap)) {
      offsetCardinal
        .divideScalar(POSITION_SNAP_SIZE)
        .round()
        .multiplyScalar(POSITION_SNAP_SIZE);
    }

    offsetParallel
      .copy(offsetCardinal)
      .rotateAround(ORIGIN, -bounds.rotation)
      .multiply(position);
    scale.copy(size).add(offsetParallel).divide(size);

    if (!hasMutualAngle || event.shiftKey || scaleWithRatio) {
      scale.x =
        (scale.x * bounds.width + scale.y * bounds.height) /
        (bounds.width + bounds.height);
      scale.y = scale.x;
    }

    selections.forEach((selection) => {
      window.dispatchEvent(
        new CustomEvent<PartTransformEventDetail>(`parttransform${selection}`, {
          detail: {
            scale: scale.toArray(),
            constant: constant.toArray(),
            rotation: bounds.rotation,
          },
        }),
      );
    });
  };
  const handlePointerUp = () => {
    if (!firstMove) {
      deferUpdates(false);
      declareInteractingWithPart(false);
    }

    const partPosition = new Vector2();
    constant.rotateAround(ORIGIN, -bounds.rotation);

    mutateBlueprint((draft) => {
      selections.forEach((selection) => {
        const { o, p } = getPart<PartWithTransformations>(selection, draft);

        partPosition
          .set(p.x, p.y)
          .rotateAround(ORIGIN, -bounds.rotation)
          .sub(constant)
          .multiply(scale)
          .add(constant)
          .rotateAround(ORIGIN, bounds.rotation);

        o.x *= scale.x;
        o.y *= scale.y;
        p.x = partPosition.x;
        p.y = partPosition.y;
      });
    });

    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  };

  return !hasMutualAngle && (position.x === 0 || position.y === 0) ? null : (
    <ControlNode
      ref={node}
      position={[
        (bounds.width * position.x) / 2,
        (bounds.height * position.y) / 2,
        1,
      ]}
      onPointerDown={handlePointerDown}
    />
  );
}
