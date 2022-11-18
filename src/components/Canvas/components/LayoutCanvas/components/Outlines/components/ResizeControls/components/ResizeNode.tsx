import { Line } from '@react-three/drei';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { FC, MutableRefObject, useEffect, useRef } from 'react';
import { Bounds } from 'stores/bounds';
import { Group, LineBasicMaterial, Vector2, Vector2Tuple } from 'three';
import { UNIT_POINTS } from '../../PartsBounds/components/PartBounds';

export interface ResizeNodeProps {
  bounds: MutableRefObject<Bounds>;
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
  const group = useRef<Group>(null);
  // const constant = sideToPoint(bounds, constantSide);
  const movable = sideToPoint(bounds.current, movableSide);

  useFrame(({ camera }) => {
    const scale = (1 / camera.zoom) * NODE_SIZE;
    group.current?.scale.set(scale, scale, scale);
  });

  useEffect(() => {
    group.current?.position.set(...movable, 2);
    group.current?.rotation.set(0, 0, bounds.current.rotation);
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };
  const handlePointerMove = () => {
    //
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

      <Line
        position={[0, 0, 2]}
        color={'#8f8f8f'}
        points={UNIT_POINTS}
        lineWidth={2}
      />
    </group>
  );
};