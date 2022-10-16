import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { mutateBlueprintVersionless } from 'core/blueprint';
import { getPart } from 'core/part';
import { PartWithTransformations } from 'game/parts/PartWithTransformations';
import { DEFAULT_SNAP } from 'hooks/useDragControls';
import { FC, useEffect, useRef } from 'react';
import {
  Group,
  LineBasicMaterial,
  Vector2,
  Vector2Tuple,
  Vector3,
} from 'three';
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

    const newMovementSnapped = new Vector2(
      Math.round(newMovement.x / DEFAULT_SNAP) * DEFAULT_SNAP,
      Math.round(newMovement.y / DEFAULT_SNAP) * DEFAULT_SNAP,
    );
    const deltaMovementSnapped = newMovementSnapped
      .clone()
      .sub(movementSnapped);

    const originalDimensions = movablePoint.clone().sub(constantPoint);
    const movedMovablePoint = movablePoint.clone().add(deltaMovementSnapped);
    const scaledDimensions = movedMovablePoint.clone().sub(constantPoint);
    const scale = scaledDimensions.clone().divide(originalDimensions);

    if (scale.x === undefined) scale.setX(scaledDimensions.x);
    if (scale.y === undefined) scale.setY(scaledDimensions.y);

    mutateBlueprintVersionless((draft) => {
      draft.selections.forEach((selection) => {
        const part = getPart<PartWithTransformations>(selection, draft);

        if (part && part.p !== undefined && part.o !== undefined) {
          const partOffset = new Vector2(part.p.x, part.p.y).sub(constantPoint);
          const scaledOffset = partOffset.clone().multiply(scale);
          const deltaOffset = scaledOffset.clone().sub(partOffset);

          if (modifyX) {
            part.p.x += deltaOffset.x;
            part.o.x *= scale.x;
          }
          if (modifyY) {
            part.p.y += deltaOffset.y;
            part.o.y *= scale.y;
          }
        }
      });
    });

    group.current?.position.add(
      new Vector3(...deltaMovementSnapped.toArray(), 0),
    );
    movement.copy(newMovement);
    movementSnapped.copy(newMovementSnapped);
    movablePoint.copy(movedMovablePoint);

    invalidate();
  };
  const handlePointerUp = () => {
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
