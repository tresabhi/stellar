import Anchor from 'components/Anchor';
import * as Notification from 'components/Notification';
import mutateSettings from 'core/app/mutateSettings';
import dismissNotification from 'core/interface/dismissNotification';
import notify from 'core/interface/notify';
import useTranslator from 'hooks/useTranslator';
import useSettings from 'stores/settings';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function useServiceWorker() {
  const { t, f } = useTranslator();

  window.addEventListener('beforeinstallprompt', (event) => {
    if (useSettings.getState().interface.showInstallationPrompt) {
      notify(({ id }) => (
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
      ));
    }
  });

  const { updateServiceWorker } = useRegisterSW({
    onNeedRefresh: () => {
      notify(({ id }) => (
        <Notification.Root>
          <Notification.Info>
            <Notification.Title>{t`notifications.update.title`}</Notification.Title>
            <Notification.Description>{t`notifications.update.description`}</Notification.Description>
          </Notification.Info>

          <Notification.Actions>
            <Notification.Action onClick={() => dismissNotification(id)}>
              {t`notifications.update.actions.dismiss`}
            </Notification.Action>
            <Notification.Action
              color="accent"
              onClick={() => updateServiceWorker(true)}
            >
              {t`notifications.update.actions.restart`}
            </Notification.Action>
          </Notification.Actions>
        </Notification.Root>
      ));
    },
  });
}
