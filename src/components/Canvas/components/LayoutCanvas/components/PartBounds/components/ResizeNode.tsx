import { GroupProps, useFrame } from '@react-three/fiber';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Group, LineBasicMaterial } from 'three';
import { unitBufferGeometry2 } from './PartBound';

const NODE_SIZE = 10;
const NODE_COLOR = '#eeedef';

export const borderMaterial = new LineBasicMaterial({
  color: '#8f8f8f',
});

export const ResizeNode = forwardRef<Group, GroupProps>((props, ref) => {
  const group = useRef<Group>(null);

  useFrame(({ camera }) => {
    const scale = (1 / camera.zoom) * NODE_SIZE;
    group.current?.scale.set(scale, scale, scale);
  });

  useImperativeHandle(ref, () => group.current as Group);

  return (
    <group {...props} ref={group}>
      <mesh>
        <planeGeometry />
        <meshBasicMaterial color={NODE_COLOR} />
      </mesh>

      <line_
        position={[-0.5, -0.5, 1]}
        material={borderMaterial}
        geometry={unitBufferGeometry2}
      />
    </group>
  );
});
