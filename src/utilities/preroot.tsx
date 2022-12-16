import { extend } from '@react-three/fiber';
import { Anchor } from 'components/Anchor';
import * as Toast from 'components/Toast';
import { mutateSettings } from 'core/app';
import { dismissToast, toast } from 'core/interface';
import { useTranslator } from 'hooks/useTranslator';
import { enableMapSet, enablePatches } from 'immer';
import useSettings from 'stores/settings';
import { BufferGeometry, Mesh } from 'three';
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from 'three-mesh-bvh';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { registerSW } from 'virtual:pwa-register';

window.addEventListener('beforeinstallprompt', (event) => {
  if (useSettings.getState().interface.showInstallationPrompt) {
    toast(({ id }) => {
      const { t, f } = useTranslator();

      return (
        <Toast.Root>
          <Toast.Info>
            <Toast.Title>{t`toasts.installable.title`}</Toast.Title>
            <Toast.Description>
              {f`toasts.installable.description`[0]}
              <Anchor
                href="https://web.dev/progressive-web-apps/"
                target="_blank"
              >
                {f`toasts.installable.description`[1]}
              </Anchor>
              {f`toasts.installable.description`[2]}
            </Toast.Description>
          </Toast.Info>

          <Toast.Actions>
            <Toast.Action
              onClick={() => {
                mutateSettings((draft) => {
                  draft.interface.showInstallationPrompt = false;
                });
                dismissToast(id);
              }}
            >
              {t`toasts.installable.actions.never`}
            </Toast.Action>
            <Toast.Action onClick={() => dismissToast(id)}>
              {t`toasts.installable.actions.dismiss`}
            </Toast.Action>
            <Toast.Action
              color="accent"
              onClick={async () => {
                event.prompt();
                const { outcome } = await event.userChoice;
                if (outcome === 'accepted') dismissToast(id);
              }}
            >
              {t`toasts.installable.actions.install`}
            </Toast.Action>
          </Toast.Actions>
        </Toast.Root>
      );
    });
  }
});

const updateSW = registerSW({
  onNeedRefresh: () => {
    toast(({ id }) => {
      const { t } = useTranslator();

      return (
        <Toast.Root>
          <Toast.Info>
            <Toast.Title>{t`toasts.update.title`}</Toast.Title>
            <Toast.Description>{t`toasts.update.description`}</Toast.Description>
          </Toast.Info>

          <Toast.Actions>
            <Toast.Action onClick={() => dismissToast(id)}>
              {t`toasts.update.actions.dismiss`}
            </Toast.Action>
            <Toast.Action color="accent" onClick={() => updateSW(true)}>
              {t`toasts.update.actions.restart`}
            </Toast.Action>
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
  });

  // apply three mesh bvh optimizations
  BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
  BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
  Mesh.prototype.raycast = acceleratedRaycast;
};

export default preroot;
