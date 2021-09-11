import { FC, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import 'react-dom';

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
    <Canvas orthographic camera={{ zoom: 40, position: [0, 0, 100] }} className="editing-canvas">
      <TempCyl position={[-2, 0, 0]} height={6} />
      <TempCyl position={[2, 2, 0]} height={2} />
      <TempCyl position={[4, -3, 0]} height={4} />
      <directionalLight position={[-0.5, 0, 5]} />

      <gridHelper args={[100, 100, `white`, `gray`]} position={[0, 0, -100]} rotation={[90, 0, 0]} />
    </Canvas>
  );
};

export default EditingCanvas;
