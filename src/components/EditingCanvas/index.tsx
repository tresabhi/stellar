import { FC, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import 'react-dom';
import { OrbitControls } from '@react-three/drei';

import './index.scss';

const EditingCanvas = () => {
  const TempCyl: FC<JSX.IntrinsicElements.mesh> = ({ position, height }) => {
    return (
      <mesh position={position}>
        <cylinderGeometry args={[2, 2, height, 24]} />
        <meshStandardMaterial roughness={0.2} metalness={0.2} flatShading={true} />
      </mesh>
    );
  };

  return (
    <Canvas orthographic camera={{ zoom: 4, position: [0, 0, 10] }} className="editing-canvas">
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={false} />
      <TempCyl position={[2, -2, 0]} height={4} />
      <directionalLight position={[-0.5, 0, 5]} />

      <gridHelper args={[100, 50, `white`, `gray`]} position={[0, 0, -100]} rotation={[(Math.PI / 180) * 90, 0, 0]} />
    </Canvas>
  );
};

export default EditingCanvas;
