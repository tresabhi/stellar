/// <reference types="vite-plugin-pwa/vanillajs" />

import { extend } from '@react-three/fiber';
import Anchor from 'components/Anchor';
import * as Notification from 'components/Notification';
import mutateSettings from 'core/app/mutateSettings';
import dismissNotification from 'core/interface/dismissNotification';
import notify from 'core/interface/notify';
import useTranslator from 'hooks/useTranslator';
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
    notify(({ id }) => {
      const { t, f } = useTranslator();

      return (
        <Notification.Root>
          <Notification.Info>
            <Notification.Title>{t`notifications.installable.title`}</Notification.Title>
            <Notification.Description>
              {f`notifications.installable.description`[0]}
              <Anchor
                href="https://web.dev/progressive-web-apps/"
                target="_blank"
              >
                {f`notifications.installable.description`[1]}
              </Anchor>
              {f`notifications.installable.description`[2]}
            </Notification.Description>
          </Notification.Info>

          <Notification.Actions>
            <Notification.Action
              onClick={() => {
                mutateSettings((draft) => {
                  draft.interface.showInstallationPrompt = false;
                });
                dismissNotification(id);
              }}
            >
              {t`notifications.installable.actions.never`}
            </Notification.Action>
            <Notification.Action onClick={() => dismissNotification(id)}>
              {t`notifications.installable.actions.dismiss`}
            </Notification.Action>
            <Notification.Action
              color="accent"
              onClick={async () => {
                event.prompt();
                await event.userChoice;
                dismissNotification(id);
              }}
            >
              {t`notifications.installable.actions.install`}
            </Notification.Action>
          </Notification.Actions>
        </Notification.Root>
      );
    });
  }
});

const updateSW = registerSW({
  onNeedRefresh: () => {
    notify(({ id }) => {
      const { t } = useTranslator();

      return (
        <Notification.Root>
          <Notification.Info>
            <Notification.Title>{t`notifications.update.title`}</Notification.Title>
            <Notification.Description>{t`notifications.update.description`}</Notification.Description>
          </Notification.Info>

          <Notification.Actions>
            <Notification.Action onClick={() => dismissNotification(id)}>
              {t`notifications.update.actions.dismiss`}
            </Notification.Action>
            <Notification.Action color="accent" onClick={() => updateSW(true)}>
              {t`notifications.update.actions.restart`}
            </Notification.Action>
          </Notification.Actions>
        </Notification.Root>
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
