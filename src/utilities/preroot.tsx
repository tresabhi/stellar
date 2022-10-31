import { extend } from '@react-three/fiber';
import * as Toast from 'components/Toast';
import { toast } from 'core/interface';
import { useTranslator } from 'hooks/useTranslator';
import { enableMapSet, enablePatches } from 'immer';
import { BufferGeometry, Line, Mesh } from 'three';
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from 'three-mesh-bvh';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { registerSW } from 'virtual:pwa-register';
const updateSW = registerSW({
  onNeedRefresh: () => {
    toast(({ close }) => {
      const { t } = useTranslator();

      return (
        <Toast.Root>
          <Toast.Info>
            <Toast.Title>{t`toasts.update_available.title`}</Toast.Title>
            <Toast.Description>{t`toasts.update_available.description`}</Toast.Description>
          </Toast.Info>
          <Toast.Actions>
            <Toast.Action
              onClick={() => updateSW(true)}
            >{t`toasts.update_available.actions.restart`}</Toast.Action>
            <Toast.Action
              onClick={close}
            >{t`toasts.update_available.actions.dismiss`}</Toast.Action>
          </Toast.Actions>
        </Toast.Root>
      );
    });
  },

  onOfflineReady: () => {
    toast(({ close }) => {
      const { t } = useTranslator();

      return (
        <Toast.Root>
          <Toast.Info>
            <Toast.Title>{t`toasts.offline_ready.title`}</Toast.Title>
            <Toast.Description>{t`toasts.offline_ready.description`}</Toast.Description>
          </Toast.Info>
          <Toast.Actions>
            <Toast.Action
              onClick={close}
            >{t`toasts.offline_ready.actions.dismiss`}</Toast.Action>
          </Toast.Actions>
        </Toast.Root>
      );
    });
  },
});

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
