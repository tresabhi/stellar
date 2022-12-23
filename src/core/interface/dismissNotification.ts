import { mutateToasts } from 'core/app/mutateToasts';

export default function dismissNotification(id: string) {
  mutateToasts((draft) => {
    const index = draft.notifications.findIndex((toast) => toast.id === id);
    if (index !== -1) draft.notifications.splice(index, 1);
  });
}
