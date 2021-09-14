import { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import 'react-dom';
import { OrbitControls } from '@react-three/drei';

import './index.scss';

const EditingCanvas = () => {
  interface ITempCyl {
    height: number;
    position: [x:number, y:number, z:number];
    rotation?: number;
  }
  const TempCyl: FC<ITempCyl> = ({ position, height, rotation=0 }) => {
    return (
      <mesh position={position} rotation={[0,0,rotation]}>
        <cylinderGeometry args={[2, 2, height, 24]} />
        <meshStandardMaterial roughness={0.2} metalness={0.2} flatShading={true} />
      </mesh>
    );
  };

  return (
    <Canvas orthographic camera={{ zoom: 32, position: [0, 0, 10] }} className="editing-canvas">
      <TempCyl position={[2, -2, 0]} height={4} />
      <TempCyl position={[6, -2, 0]} height={8} />
      <TempCyl position={[10, -2, 0]} height={8} />
      <TempCyl position={[10, -6, 0]} height={8} rotation={(Math.PI / 180) * 90} />

      <directionalLight position={[-0, 0, 5]} />
      <ambientLight intensity={0.1} />

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={false} />
      <gridHelper args={[100, 50, `white`, `gray`]} position={[0, 0, -100]} rotation={[(Math.PI / 180) * 90, 0, 0]} />
    </Canvas>
  );
};

export default EditingCanvas;
