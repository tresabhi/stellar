import { createRef } from 'react';
import 'react-dom';
import * as THREE from 'three';

import './index.scss';

const EditingCanvas = () => {
  let canvas = createRef();

  const scene = new THREE.Scene();

  return <canvas ref={canvas} className="editing-canvas" />;
};

export default EditingCanvas;
