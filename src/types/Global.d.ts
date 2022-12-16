import { Object3DNode } from '@react-three/fiber';
import { UpdateResizeNodesDetail } from 'components/Canvas/components/LayoutCanvas/components/Outlines/components/ResizeControls';
import { PartMoveEventDetail } from 'core/part';
import { PartResizeEventDetail } from 'core/part/resizePartAsync';
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

  /**
   * Thank you, kremerd!
   * https://stackoverflow.com/a/51847335/12294756
   */
  interface WindowEventMap extends Event {
    beforeinstallprompt: {
      readonly platforms: Array<string>;
      readonly userChoice: Promise<{
        outcome: 'accepted' | 'dismissed';
        platform: string;
      }>;
      prompt(): Promise<void>;
    };

    updateresizenodes: { detail: UpdateResizeNodesDetail };

    [`partresize${string}`]: { detail: PartResizeEventDetail };

    partscale: { detail: PartScaleEventDetail };

    partmove: { detail: PartMoveEventDetail };
  }
}
