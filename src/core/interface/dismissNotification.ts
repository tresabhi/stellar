import mutateNotifications from 'core/app/mutateNotifications';

export default function dismissNotification(id: string) {
  mutateNotifications((draft) => {
    const index = draft.notifications.findIndex((toast) => toast.id === id);
    if (index !== -1) draft.notifications.splice(index, 1);
  });
}
