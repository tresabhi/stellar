import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { mutateVersionControl } from 'core/app';
import { mutateParts } from 'core/part';
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

export const CANVAS_MATRIX_SCALE = new Vector2(1, -1);

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
  const initial = new Vector2();
  const movement = new Vector2();
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
    invalidate();
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    initial.set(event.nativeEvent.clientX, event.nativeEvent.clientY);
    movement.set(0, 0);

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };
  const handlePointerMove = (event: PointerEvent) => {
    const snapDistance = getSnapDistance(event);
    const newMovement = new Vector2(event.clientX, event.clientY)
      .sub(initial)
      .divideScalar(camera.zoom)
      .multiply(CANVAS_MATRIX_SCALE);

    if (snapDistance !== 0) {
      newMovement
        .divideScalar(snapDistance)
        .round()
        .multiplyScalar(snapDistance);
    }

    const delta = newMovement.clone().sub(movement);

    if (delta.length() !== 0) {
      const originalDimensions = movablePoint.clone().sub(constantPoint);
      const movedMovablePoint = movablePoint.clone().add(delta);
      const scaledDimensions = movedMovablePoint.clone().sub(constantPoint);

      scale.set(
        originalDimensions.x === 0
          ? scaledDimensions.x
          : scaledDimensions.x / originalDimensions.x,
        originalDimensions.y === 0
          ? scaledDimensions.y
          : scaledDimensions.y / originalDimensions.y,
      );

      if (!modifyX) scale.x = 1;
      if (!modifyY) scale.y = 1;
      if (scale.x === undefined) scale.setX(scaledDimensions.x);
      if (scale.y === undefined) scale.setY(scaledDimensions.y);

      const [nextState, patches, inversePatches] = produceWithPatches(
        useBlueprint.getState(),
        (draft) => {
          mutateParts<PartWithTransformations>(
            draft.selections,
            (partDraft) => {
              if (
                partDraft &&
                partDraft.p !== undefined &&
                partDraft.o !== undefined
              ) {
                const partOffsetX = partDraft.p.x - constantPoint.x;
                const partOffsetY = partDraft.p.y - constantPoint.y;
                const scaledOffsetX = partOffsetX * scale.x;
                const scaledOffsetY = partOffsetY * scale.y;
                const deltaOffsetX = scaledOffsetX - partOffsetX;
                const deltaOffsetY = scaledOffsetY - partOffsetY;

                partDraft.p.x += deltaOffsetX;
                partDraft.o.x =
                  partDraft.o.x === 0 ? scale.x : partDraft.o.x * scale.x;
                partDraft.p.y += deltaOffsetY;
                partDraft.o.y =
                  partDraft.o.y === 0 ? scale.y : partDraft.o.y * scale.y;
              }
            },
            draft,
            true,
          );
        },
      );

      if (delta.x !== 0 && delta.y === 0) {
        patchesX = patches;
        if (inversePatchesX === undefined) inversePatchesX = inversePatches;
      } else if (delta.x === 0 && delta.y !== 0) {
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
      movement.copy(newMovement);
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

    if (movement.length() > 0) {
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
