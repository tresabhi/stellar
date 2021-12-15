import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as PartAPI from 'core/API/part/index';
import * as RootPart from 'core/API/part/types/root';
import { FC } from 'react';
import { MOUSE, TOUCH } from 'three';
import './index.scss';

interface EditingCanvasProps {
  center: number;
  offset: { x: number; y: number };
  parts: RootBlueprint.anyPartTypeArray;
}
const EditingCanvas: FC<EditingCanvasProps> = ({ center, offset, parts }) => {
  const partsJsx: JSX.Element[] = [];

  const insertPartComponents = (parts: RootPart.anyPartType[]) => {
    parts.forEach((part) => {
      if (part['.stellar'].visible) {
        if (part.n === 'Group') {
          insertPartComponents(part.parts);
        } else {
          const PartComponent = PartAPI.getPartComponent(part.n);
          if (PartComponent)
            partsJsx.push(
              <PartComponent key={`part-${partsJsx.length}`} data={part} />,
            );
        }
      }
    });
  };

  insertPartComponents(parts);

  return (
    <Canvas
      frameloop="demand"
      orthographic
      camera={{ zoom: 16, position: [center * -1, 0, 100] }}
      className="editing-canvas"
    >
      <directionalLight position={[-20, 20, 100]} />
      <ambientLight intensity={0.5} />

      <OrbitControls
        mouseButtons={{
          LEFT: MOUSE.RIGHT,
          MIDDLE: MOUSE.MIDDLE,
          RIGHT: MOUSE.LEFT,
        }}
        touches={{
          ONE: TOUCH.PAN,
          TWO: TOUCH.DOLLY_PAN,
        }}
        enableRotate={false}
        enableDamping={false}
      />
      <gridHelper
        position={[center, 0, -100]}
        args={[1000, 1000, '#b062f5', '#22272e']}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <group position={[offset.x, offset.y, 0]}>{partsJsx}</group>
    </Canvas>
  );
};

export default EditingCanvas;
