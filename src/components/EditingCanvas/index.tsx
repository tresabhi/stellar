import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import InfiniteGridHelper from 'components/InfiniteGridHelper';
import * as RootBlueprint from 'core/API/blueprint/types/root';
import * as PartAPI from 'core/API/part/index';
import * as RootPart from 'core/API/part/types/root';
import { FC } from 'react';
import { Color, MOUSE, TOUCH } from 'three';
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
      mode="concurrent"
      frameloop="demand"
      orthographic
      camera={{ zoom: 16, position: [center * -1, 0, 100] }}
      className="editing-canvas"
    >
      <directionalLight position={[-20, 20, 100]} />
      <ambientLight intensity={0.5} />

      <OrbitControls
        maxZoom={400}
        minZoom={2}
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
        position={[center, 0, -99]}
        args={[100000, 2, '#b062f5']}
        rotation={[Math.PI / 2, 0, 0]}
      />

      <InfiniteGridHelper
        position={[center, 0, -100]}
        axes="xyz"
        size1={1}
        size2={4}
        distance={1000}
        color={new Color('gray')}
      />

      <group position={[offset.x, offset.y, 0]}>{partsJsx}</group>
    </Canvas>
  );
};

export default EditingCanvas;
