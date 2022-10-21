import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { mutateVersionControl } from 'core/app';
import { getPart } from 'core/part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { Patch, produceWithPatches } from 'immer';
import { FC, useEffect, useRef } from 'react';
import useBlueprint from 'stores/useBlueprint';
import useSettings from 'stores/useSettings';
import { Group, LineBasicMaterial, Vector2, Vector2Tuple } from 'three';
import { getSnapDistance } from 'utilities/getSnapDistance';
import { unitBufferGeometry2 } from './PartBound';

export interface ResizeNodeProps {
  constant: () => Vector2Tuple;
  movable: () => Vector2Tuple;
  x?: boolean;
  y?: boolean;
}

const canvasMatrixScale = new Vector2(1, -1);

const NODE_SIZE = 10;
const NODE_COLOR = '#eeedef';

export const borderMaterial = new LineBasicMaterial({
  color: '#8f8f8f',
});

export const ResizeNode: FC<ResizeNodeProps> = ({
  constant,
  movable,
  x: modifyX = true,
  y: modifyY = true,
}) => {
  const { camera, invalidate } = useThree();
  const group = useRef<Group>(null);
  const initialPosition = new Vector2();
  const movement = new Vector2();
  const movementSnapped = new Vector2();
  const constantPoint = new Vector2();
  const movablePoint = new Vector2();
  const scale = new Vector2();
  let inversePatchesX: Patch[] | undefined;
  let inversePatchesY: Patch[] | undefined;
  let patchesX: Patch[] | undefined;
  let patchesY: Patch[] | undefined;

  useFrame(({ camera }) => {
    const scale = (1 / camera.zoom) * NODE_SIZE;
    group.current?.scale.set(scale, scale, scale);
  });

  useEffect(() => {
    constantPoint.fromArray(constant());
    movablePoint.fromArray(movable());

    group.current?.position.set(...movablePoint.toArray(), 2);
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    initialPosition.set(event.nativeEvent.clientX, event.nativeEvent.clientY);
    movement.set(0, 0);
    movementSnapped.set(0, 0);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };
  const handlePointerMove = (event: PointerEvent) => {
    const newMovement = new Vector2(event.clientX, event.clientY)
      .sub(initialPosition)
      .multiplyScalar(1 / camera.zoom)
      .multiply(canvasMatrixScale);
    const snapDistance = getSnapDistance(event);
    const newMovementSnapped =
      snapDistance === 0
        ? newMovement.clone()
        : new Vector2(
            Math.round(newMovement.x / snapDistance) * snapDistance,
            Math.round(newMovement.y / snapDistance) * snapDistance,
          );
    const deltaMovementSnapped = newMovementSnapped
      .clone()
      .sub(movementSnapped);

    if (deltaMovementSnapped.length() !== 0) {
      const originalDimensions = movablePoint.clone().sub(constantPoint);
      const movedMovablePoint = movablePoint.clone().add(deltaMovementSnapped);
      const scaledDimensions = movedMovablePoint.clone().sub(constantPoint);

      scale.copy(scaledDimensions).divide(originalDimensions);

      if (!modifyX) scale.x = 1;
      if (!modifyY) scale.y = 1;
      if (scale.x === undefined) scale.setX(scaledDimensions.x);
      if (scale.y === undefined) scale.setY(scaledDimensions.y);

      const [nextState, patches, inversePatches] = produceWithPatches(
        useBlueprint.getState(),
        (draft) => {
          draft.selections.forEach((selection) => {
            const part = getPart<PartWithTransformations>(selection, draft);

            if (part && part.p !== undefined && part.o !== undefined) {
              const partOffset = new Vector2(part.p.x, part.p.y).sub(
                constantPoint,
              );
              const scaledOffset = partOffset.clone().multiply(scale);
              const deltaOffset = scaledOffset.clone().sub(partOffset);

              part.p.x += deltaOffset.x;
              part.o.x = part.o.x === 0 ? scale.x : part.o.x * scale.x;
              part.p.y += deltaOffset.y;
              part.o.y = part.o.y === 0 ? scale.y : part.o.y * scale.y;
            }
          });
        },
      );

      if (deltaMovementSnapped.x !== 0 && deltaMovementSnapped.y === 0) {
        patchesX = patches;
        if (inversePatchesX === undefined) inversePatchesX = inversePatches;
      } else if (deltaMovementSnapped.x === 0 && deltaMovementSnapped.y !== 0) {
        patchesY = patches;
        if (inversePatchesY === undefined) inversePatchesY = inversePatches;
      } else {
        patchesX = patches.filter(
          (patch) => patch.path[patch.path.length - 1] === 'x',
        );
        patchesY = patches.filter(
          (patch) => patch.path[patch.path.length - 1] === 'y',
        );

        if (inversePatchesX === undefined) {
          inversePatchesX = inversePatches.filter(
            (patch) => patch.path[patch.path.length - 1] === 'x',
          );
        }
        if (inversePatchesY === undefined) {
          inversePatchesY = inversePatches.filter(
            (patch) => patch.path[patch.path.length - 1] === 'y',
          );
        }
      }

      useBlueprint.setState(nextState);
      scale.copy(newMovement);
      movementSnapped.copy(newMovementSnapped);
      movablePoint.copy(movedMovablePoint);
      invalidate();
    }
  };
  const handlePointerUp = () => {
    const patches = [...(patchesX ?? []), ...(patchesY ?? [])];
    const inversePatches = [
      ...(inversePatchesX ?? []),
      ...(inversePatchesY ?? []),
    ];

    if (movementSnapped.length() > 0) {
      const { undoLimit } = useSettings.getState().editor;

      mutateVersionControl((draft) => {
        draft.history.splice(
          draft.index + 1,
          draft.history.length - draft.index - 1,
        );

        draft.history.push({
          inversePatches: inversePatches,
          patches: patches,
        });

        if (undoLimit === 0) {
          draft.index++;
        } else {
          if (draft.history.length > undoLimit) {
            draft.history.shift();
          } else {
            draft.index++;
          }
        }
      });
    }

    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  };

  return (
    <group ref={group} onPointerDown={handlePointerDown}>
      <mesh>
        <planeGeometry />
        <meshBasicMaterial color={NODE_COLOR} />
      </mesh>

      <line_
        position={[-0.5, -0.5, 2]}
        material={borderMaterial}
        geometry={unitBufferGeometry2}
      />
    </group>
  );
};
