import { generateId } from 'core/part';
import useNotifications, { Notification } from 'hooks/useNotifications';

export interface NotifyOptions
  extends Omit<Omit<Omit<Notification, 'id'>, 'title'>, 'message'> {
  persistent: boolean;
  lifespan: number;
}

export const defaultNotifyOptions: NotifyOptions = {
  lifespan: 5000,
  persistent: false,
  type: 'info',
};

export const notify = (
  title: string,
  message: string,
  options: Partial<NotifyOptions> = defaultNotifyOptions,
) => {
  const mergedOptions = { ...defaultNotifyOptions, ...options };
  const id = generateId();
  const notification: Notification = { id, title, message, ...mergedOptions };

  useNotifications.setState((state) => [notification, ...state], true);

  if (!mergedOptions.persistent) {
    setTimeout(() => {
      useNotifications.setState(
        (state) => state.filter((notification) => notification.id !== id),
        true,
      );
    }, mergedOptions.lifespan);
  }

  return id;
};
