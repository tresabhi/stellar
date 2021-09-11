import { useRef, MutableRefObject } from 'react';
import 'react-dom';
import * as THREE from 'three';

import './index.scss';

const EditingCanvas = () => {
  let canvasRef = useRef<HTMLCanvasElement>(null);

  const scene = new THREE.Scene();

  return <canvas ref={canvasRef} className="editing-canvas" />;
};

export default EditingCanvas;
