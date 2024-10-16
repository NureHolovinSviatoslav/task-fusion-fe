import { useMutation } from '@tanstack/react-query';

import { Notification } from '@/types';
import { QueryKeys } from '@/types/enums';
import { readMyNotifications } from '@/utils/api/mutations';
import { queryClient } from '@/utils/queryClient';

import { NoData } from './NoData';
import styles from './NotificationList.module.scss';
import NotificationListItem from './NotificationListItem';

type NotificationListProps = {
  notifications: Notification[];
  setIsOpen: (value: boolean) => void;
};

export const NotificationList = ({ notifications, setIsOpen }: NotificationListProps) => {
  const { mutateAsync: mutateReadMyNotifications } = useMutation({
    mutationFn: readMyNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.NOTIFICATIONS],
      });
    },
  });

  const handleMarkAllAsRead = async () => {
    await mutateReadMyNotifications();

    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>Notifications</h2>

        <div className={styles.buttonsWrapper}>
          <button className={styles.markAllButton} onClick={handleMarkAllAsRead}>
            Mark all as read
          </button>

          <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
            ×
          </button>
        </div>
      </div>

      <div className={styles.listItems}>
        {notifications.length ? (
          notifications.map((notification) => (
            <NotificationListItem key={notification.id} notification={notification} setIsOpen={setIsOpen} />
          ))
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};
