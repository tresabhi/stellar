import { extend } from '@react-three/fiber';
import useSettings from 'stores/useSettings';
import { translationsRegistry } from 'hooks/useTranslator';
import { enableMapSet, enablePatches } from 'immer';
import { BufferGeometry, Line, Mesh } from 'three';
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from 'three-mesh-bvh';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { primeServiceWorker } from './serviceWorkerRegistration';

const prerender = () => {
  // register the service worker

  primeServiceWorker();
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

  // check if language exists
  if (!translationsRegistry.has(useSettings.getState().language)) {
    console.warn(
      `No translations for language ${
        useSettings.getState().language
      }, falling back to en-US`,
    );
    useSettings.setState({ language: 'en-US' });
  }
};

export default prerender;
