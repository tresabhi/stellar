import { Canvas } from '@react-three/fiber';
import 'react-dom';
import { OrbitControls } from '@react-three/drei';

import FuelTank from '../../utilities/parts/FuelTank';

import './index.scss';

const EditingCanvas = () => {
  return (
    <Canvas orthographic camera={{ zoom: 32, position: [0, 0, 10] }} className="editing-canvas">
      <FuelTank.Part />

      <directionalLight position={[-0, 0, 5]} />
      <ambientLight intensity={0.1} />

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={false} />
      <gridHelper args={[100, 50, `white`, `gray`]} position={[0, 0, -100]} rotation={[(Math.PI / 180) * 90, 0, 0]} />
    </Canvas>
  );
};

export default EditingCanvas;
