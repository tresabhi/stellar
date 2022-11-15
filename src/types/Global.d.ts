import { Object3DNode } from '@react-three/fiber';
import { Line } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { PrecacheEntry } from 'workbox-precaching';

declare global {
  interface Window {
    __WB_MANIFEST: Array<PrecacheEntry | string>;
    log: {
      type: 'info' | 'warn' | 'error';
      content: string;
    }[];
  }

  // TODO: fix this eslint issue?
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      line2: Object3DNode<Line2, typeof Line2>;
      lineGeometry: Object3DNode<LineGeometry, typeof LineGeometry>;
      lineMaterial: Object3DNode<LineMaterial, typeof LineMaterial>;
    }
  }

  module '*.gltf' {
    const url: string;
    export default url;
  }
}
