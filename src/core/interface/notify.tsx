import { mutateToasts } from 'core/app/mutateToasts';
import { nanoid } from 'nanoid';
import { FC } from 'react';
import { NotificationsProps } from 'stores/notifications';

export default function notify(Component: FC<NotificationsProps>) {
  const id = nanoid();

  mutateToasts((draft) => {
    draft.notifications.push({
      id,
      node: <Component id={id} key={`toast-${id}`} />,
    });
  });
}
