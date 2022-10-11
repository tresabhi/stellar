import { extend } from '@react-three/fiber';
import { enableMapSet, enablePatches } from 'immer';
import { BufferGeometry, Line, Mesh } from 'three';
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from 'three-mesh-bvh';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
// import { registerSW } from 'virtual:pwa-register';

// TODO: update these to use actual notifications
// const updateSW = registerSW({
//   onNeedRefresh: () => {
//     console.log('needs refresh');
//   },
//   onOfflineReady: () => {
//     console.log('offline ready');
//   },
// });

// console.log('call', updateSW);

const preroot = () => {
  // enable immer features
  enableMapSet();
  enablePatches();

  // add custom R3F elements
  extend({
    Line2,
    LineMaterial,
    Line_: Line,
  });

  // apply three mesh bvh optimizations
  BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
  BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
  Mesh.prototype.raycast = acceleratedRaycast;
};

export default preroot;
