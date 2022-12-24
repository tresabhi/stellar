import mutateNotifications from 'core/app/mutateNotifications';
import { nanoid } from 'nanoid';
import { FC } from 'react';
import { NotificationsProps } from 'stores/notifications';
import dismissNotification from './dismissNotification';

export default function notify(Component: FC<NotificationsProps>) {
  const id = nanoid();

  mutateNotifications((draft) => {
    draft.notifications.push({
      id,
      node: (
        <Component
          id={id}
          key={`toast-${id}`}
          dismiss={() => dismissNotification(id)}
        />
      ),
    });
  });
}
