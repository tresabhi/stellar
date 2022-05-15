import * as NotificationsComponent from 'components/Notifications';
import useNotifications from 'hooks/useNotifications';
import styles from './index.module.scss';

const Notifications = () => {
  const notifications = useNotifications();
  const notificationNodes = notifications.map((notification) => (
    <NotificationsComponent.Notification
      notification={notification}
      key={`notification-${notification.id}`}
    />
  ));

  return (
    <NotificationsComponent.Container
      className={styles['notifications-container']}
    >
      {notificationNodes}
    </NotificationsComponent.Container>
  );
};
export default Notifications;
