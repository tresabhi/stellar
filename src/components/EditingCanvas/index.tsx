import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as Part from 'core/APIs/parts/index';
import * as RootPart from 'core/APIs/parts/root';
import * as RootBlueprint from 'core/APIs/blueprint/root';
import { FC } from 'react';
import './index.scss';

type EditingCanvasProps = {
  center: number;
  offset: { x: number; y: number };
  parts: RootBlueprint.anyPartTypeArray;
};
const EditingCanvas: FC<EditingCanvasProps> = ({ center, offset, parts }) => {
  const partsJsx: Array<JSX.Element> = [];

  const getAllComponentsRecursively = (parts: Array<RootPart.anyPartType>) => {
    parts.forEach((part) => {
      if (part.n === 'Group') {
        getAllComponentsRecursively(part.parts);
      } else {
        const PartComponent = Part.getPartComponent(part.n);
        if (PartComponent)
          partsJsx.push(
            <PartComponent key={`part-${partsJsx.length}`} data={part} />,
          );
      }
    });
  };

  getAllComponentsRecursively(parts);

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
        enableDamping={false}
        enablePan={true}
        enableZoom={true}
        enableRotate={false}
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
