import { Line } from '@react-three/drei';
import { GroupProps, useFrame, useThree } from '@react-three/fiber';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Group, Mesh, Vector2Tuple, Vector3 } from 'three';
import { Line2 } from 'three-stdlib';
import parseVector3Like from 'utilities/parseVector3Like';
import { UNIT_POINTS } from './LayoutCanvas/components/PartsBounds/components/PartBounds';

export interface ControlNodeProps extends GroupProps {
  size?: number;
  colorInner?: string;
  colorOuter?: string;
  touchAreaSize?: Vector2Tuple;
}

const ControlNode = forwardRef<Group, ControlNodeProps>(
  (
    {
      scale = new Vector3(1, 1, 1),
      size = 10,
      colorInner = '#eeedef',
      colorOuter = '#8f8f8f',
      touchAreaSize = [4, 4],
      ...props
    },
    ref,
  ) => {
    const parsedScale = parseVector3Like(scale);
    const group = useRef<Group>(null);
    const mesh = useRef<Mesh>(null);
    const touchArea = useRef<Mesh>(null);
    const outline = useRef<Line2>(null);
    const camera = useThree((state) => state.camera);

    useImperativeHandle(ref, () => group.current as Group);

    useFrame(() => {
      const coefficient = (1 / camera.zoom) * size;
      mesh.current?.scale.copy(parsedScale).multiplyScalar(coefficient);
      touchArea.current?.scale.copy(parsedScale).multiplyScalar(coefficient);
      outline.current?.scale.copy(parsedScale).multiplyScalar(coefficient);
    });

    return (
      <group ref={group} {...props}>
        <mesh ref={mesh}>
          <planeGeometry />
          <meshBasicMaterial color={colorInner} />
        </mesh>

        <mesh ref={touchArea} visible={false}>
          <planeGeometry args={touchAreaSize} />
        </mesh>

        <Line
          ref={outline}
          position={[0, 0, 2]}
          color={colorOuter}
          points={UNIT_POINTS}
          lineWidth={2}
        />
      </group>
    );
  },
);
export default ControlNode;
