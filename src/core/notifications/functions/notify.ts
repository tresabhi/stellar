import useNotifications, {
  Notification,
  NotificationType,
} from 'hooks/useNotifications';
import { v4 as UUIDV4 } from 'uuid';

export const notify = (
  title: string,
  message: string,
  type: NotificationType = 'info',
  persistent = false,
  lifespan = 5000,
) => {
  const id = UUIDV4();
  const notification: Notification = { id, type, title, message };

  useNotifications.setState((state) => [notification, ...state], true);

  if (!persistent) {
    setTimeout(() => {
      useNotifications.setState(
        (state) => state.filter((notification) => notification.id !== id),
        true,
      );
    }, lifespan);
  }

  return id;
};
