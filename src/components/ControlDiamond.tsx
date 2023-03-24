import { Line } from '@react-three/drei';
import { GroupProps, useFrame, useThree } from '@react-three/fiber';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Group, Vector3 } from 'three';
import parseVector3Like from 'utilities/parseVector3Like';
import { UNIT_POINTS } from './LayoutCanvas/components/PartsBounds/components/PartBounds';

export interface ControlDiamondProps extends GroupProps {
  size?: number;
  colorInner?: string;
  colorOuter?: string;
}

const ControlDiamond = forwardRef<Group, ControlDiamondProps>(
  (
    {
      scale = new Vector3(1, 1, 1),
      size = 10,
      colorInner = '#eeedef',
      colorOuter = '#8f8f8f',
      ...props
    },
    ref,
  ) => {
    const parsedScale = parseVector3Like(scale);
    const group = useRef<Group>(null);
    const camera = useThree((state) => state.camera);

    useImperativeHandle(ref, () => group.current as Group);

    useFrame(() => {
      const coefficient = (1 / camera.zoom) * size;
      group.current?.scale.copy(parsedScale).multiplyScalar(coefficient);
    });

    return (
      <group ref={group} {...props}>
        <mesh>
          <planeGeometry />
          <meshBasicMaterial color={colorInner} />
        </mesh>

        <Line
          position={[0, 0, 2]}
          color={colorOuter}
          points={UNIT_POINTS}
          lineWidth={2}
        />
      </group>
    );
  },
);
export default ControlDiamond;
