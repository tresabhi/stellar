import { Canvas } from '@react-three/fiber';
import 'react-dom';
import { OrbitControls } from '@react-three/drei';

import Part from 'components/Part';

import './index.scss';

const EditingCanvas = () => {
  return (
    <Canvas orthographic camera={{ zoom: 32, position: [0, 0, 10] }} className="editing-canvas">
      <Part.FuelTank />

      <directionalLight position={[-0, 0, 5]} />
      <ambientLight intensity={0.1} />

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={false} />
      <gridHelper args={[100, 50, 'green', 'red']} position={[0, 0, -100]} rotation={[(Math.PI / 180) * 90, 0, 0]} />
    </Canvas>
  );
};

export default EditingCanvas;
