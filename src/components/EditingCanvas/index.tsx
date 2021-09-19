import { Canvas } from '@react-three/fiber';
import 'react-dom';
import { OrbitControls } from '@react-three/drei';

import Part from '../Part';

import './index.scss';

const EditingCanvas = () => {
  return (
    <Canvas frameloop={'demand'} orthographic camera={{ zoom: 32, position: [0, 0, 10] }} className="editing-canvas">
      <Part.FuelTank />
      {/* <Part.FuelTank override={{ N: { width_a: 4 }, p: { x: 4 } }} /> */}

      <directionalLight position={[-0, 0, 5]} />
      <ambientLight intensity={0.1} />

      <OrbitControls enableDamping={false} enablePan={true} enableZoom={true} enableRotate={false} />
      <gridHelper args={[1000, 1000, '#b062f5', '#22272e']} rotation={[Math.PI / 2, 0, 0]} />
      {/* <InfiniteGridHelper axes="yxz" size1={1} size2={2} /> */}
    </Canvas>
  );
};

export default EditingCanvas;
