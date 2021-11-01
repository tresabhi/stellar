import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FC } from 'react';
import 'react-dom';
import * as Part from 'core/blueprint/parts/index';
import { type as rootPartType } from 'core/blueprint/parts/Root';
import './index.scss';

type EditingCanvasProps = {
  center: number;
  offset: { x: number; y: number };
  parts: Array<rootPartType>;
};
const EditingCanvas: FC<EditingCanvasProps> = ({ center, offset, parts }) => {
  const partsJsx = parts.map((part) => {
    const PartComponent = Part.getComponentFromPartName(part.n);

    return <PartComponent data={part} offset={offset} />;
  });

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

      {partsJsx}
    </Canvas>
  );
};

export default EditingCanvas;
