import { Notification as NotificationPayload } from 'hooks/useNotifications';
import { FC, useState } from 'react';
import styles from '../index.module.scss';

export interface NotificationProps {
  notification: NotificationPayload;
}
export const Notification: FC<NotificationProps> = ({ notification }) => {
  const [expanded, setExpanded] = useState(false);
  const actions = notification.actions?.map((action, index) => (
    <button
      className={styles.action}
      onClick={action.callback}
      key={`action-${index}`}
    >
      {action.label}
    </button>
  ));
  const handleClick = () => setExpanded((state) => !state);

  return (
    <div
      className={`${styles.notification} ${styles[notification.type]} ${
        expanded ? styles.expanded : ''
      }`}
      onClick={handleClick}
    >
      <span className={styles.title}>{notification.title}</span>
      <span className={styles.body}>{notification.message}</span>
      {notification.actions && notification.actions.length > 0 ? (
        <div className={styles.actions}>{actions}</div>
      ) : null}
    </div>
  );
};
