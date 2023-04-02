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
  circle?: boolean;
}

const ControlNode = forwardRef<Group, ControlNodeProps>(
  (
    {
      scale = new Vector3(1, 1, 1),
      size = 10,
      colorInner = '#eeedef',
      colorOuter = '#8f8f8f',
      touchAreaSize = [4, 4],
      circle = false,
      ...props
    },
    ref,
  ) => {
    const parsedScale = parseVector3Like(scale);
    const group = useRef<Group>(null);
    const mesh = useRef<Mesh>(null);
    const touchArea = useRef<Mesh>(null);
    const outline = useRef<Line2>(null);
    const circleOutline = useRef<Mesh>(null);
    const camera = useThree((state) => state.camera);
    const scaleVector = new Vector3();

    useImperativeHandle(ref, () => group.current as Group);

    useFrame(() => {
      const coefficient = (1 / camera.zoom) * size;

      scaleVector.copy(parsedScale).multiplyScalar(coefficient);
      mesh.current?.scale.copy(scaleVector);
      touchArea.current?.scale.copy(scaleVector);
      outline.current?.scale.copy(scaleVector);
      circleOutline.current?.scale.copy(scaleVector);
    });

    return (
      <group ref={group} {...props}>
        <mesh ref={mesh} position={[0, 0, 1]}>
          {circle ? <circleGeometry args={[0.5, 16]} /> : <planeGeometry />}
          <meshBasicMaterial color={colorInner} />
        </mesh>

        <mesh ref={touchArea} visible={false}>
          <planeGeometry args={touchAreaSize} />
        </mesh>

        {circle ? (
          <mesh ref={circleOutline} position={[0, 0, 0]}>
            <circleGeometry args={[0.75, 16]} />
            <meshBasicMaterial color={colorOuter} />
          </mesh>
        ) : (
          <Line
            ref={outline}
            position={[0, 0, 2]}
            color={colorOuter}
            points={UNIT_POINTS}
            lineWidth={2}
          />
        )}
      </group>
    );
  },
);
export default ControlNode;
