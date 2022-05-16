import { CaretDownIcon, CaretUpIcon, Cross2Icon } from '@radix-ui/react-icons';
import useNotifications, {
  Notification as NotificationPayload,
} from 'hooks/useNotifications';
import { FC, MouseEvent, useState } from 'react';
import styles from '../index.module.scss';

export interface NotificationProps {
  notification: NotificationPayload;
}
export const Notification: FC<NotificationProps> = ({ notification }) => {
  const [expanded, setExpanded] = useState(false);
  const actions = notification.actions?.map((action, index) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (action.dismiss ?? true) {
        useNotifications.setState(
          (state) => state.filter((n) => n.id !== notification.id),
          true,
        );
      }
      if (action.callback) action.callback();
    };

    return (
      <button
        className={styles.action}
        onClick={handleClick}
        key={`action-${index}`}
      >
        {action.label}
      </button>
    );
  });
  const handleClick = () => setExpanded((state) => !state);

  return (
    <div
      className={`${styles.notification} ${styles[notification.type]} ${
        expanded ? styles.expanded : ''
      }`}
      onClick={handleClick}
    >
      <div className={styles['title-bar']}>
        <span className={styles.title}>{notification.title}</span>
        {expanded ? (
          <CaretDownIcon className={styles.icon} />
        ) : (
          <CaretUpIcon className={styles.icon} />
        )}
        <Cross2Icon className={styles.icon} />
      </div>
      <span className={styles.body}>{notification.message}</span>
      {notification.actions && notification.actions.length > 0 ? (
        <div className={styles.actions}>{actions}</div>
      ) : null}
    </div>
  );
};
