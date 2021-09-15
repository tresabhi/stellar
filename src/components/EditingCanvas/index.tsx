import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import 'react-dom';
import { OrbitControls } from '@react-three/drei';

import FuelTank from '../../utilities/parts/FuelTank';

import './index.scss';

const EditingCanvas = () => {
  const asd = useState(2);

  return (
    <Canvas orthographic camera={{ zoom: 32, position: [0, 0, 10] }} className="editing-canvas">
      {/* TO DO PROVIDING AN OVERRIDE IN SUB OBJECT REPLACES SUB OBJECT ||||| MERGE THEM INSTEAD */}
      <FuelTank.Part overrideData={{ N: { height: 1000 } }} />

      <directionalLight position={[-0, 0, 5]} />
      <ambientLight intensity={0.1} />

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={false} />
      <gridHelper args={[100, 50, 'green', 'red']} position={[0, 0, -100]} rotation={[(Math.PI / 180) * 90, 0, 0]} />
    </Canvas>
  );
};

export default EditingCanvas;
