import { Canvas } from '@react-three/fiber';
import 'react-dom';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import Part from '../Part';
import InfiniteGridHelper from '../InfiniteGridHelper';

import './index.scss';

const EditingCanvas = () => {
  return (
    <Canvas frameloop={'demand'} orthographic camera={{ zoom: 32, position: [0, 0, 10] }} className="editing-canvas">
      <Part.FuelTank />
      {/* <Part.FuelTank override={{ N: { width_a: 4 }, p: { x: 4 } }} /> */}

      <directionalLight position={[-0, 0, 5]} />
      <ambientLight intensity={0.1} />

      <OrbitControls enableDamping={false} enablePan={true} enableZoom={true} enableRotate={false} />

      <InfiniteGridHelper distance={Math.pow(2, 12)} axes="yxz" size1={1} size2={2} />
    </Canvas>
  );
};

export default EditingCanvas;
