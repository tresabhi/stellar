import { ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { FC, useEffect, useRef } from 'react';
import { Bounds } from 'stores/bounds';
import { Group, LineBasicMaterial, Vector2, Vector2Tuple } from 'three';
import { unitBufferGeometry2 } from '../../PartsBounds/components/PartBound';

export interface ResizeNodeProps {
  bounds: Bounds;
  constant: Vector2Tuple;
  movable: Vector2Tuple;
  maintainSlope?: boolean;
}

export const CANVAS_MATRIX_SCALE = new Vector2(1, -1);

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
  // constant: constantSide,
  movable: movableSide,
  // maintainSlope = false,
}) => {
  const { invalidate } = useThree();
  const group = useRef<Group>(null);
  // const constant = sideToPoint(bounds, constantSide);
  const movable = sideToPoint(bounds, movableSide);

  useFrame(({ camera }) => {
    const scale = (1 / camera.zoom) * NODE_SIZE;
    group.current?.scale.set(scale, scale, scale);
  });

  useEffect(() => {
    group.current?.position.set(...movable, 2);
    group.current?.rotation.set(0, 0, bounds.rotation);
    invalidate();
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };
  const handlePointerMove = () => {
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
