import classNames from 'classnames';
import Link from 'next/link';

import { Notification } from '@/types';

import { Export } from '../svg/Export';

import styles from './NotificationListItem.module.scss';

type NotificationListItemProps = {
  notification: Notification;
  setIsOpen: (value: boolean) => void;
};

const NotificationListItem = ({ notification, setIsOpen }: NotificationListItemProps) => {
  return (
    <div className={classNames(styles.listItemWrapper, { [styles.listItemWrapperRead]: notification.isRead })}>
      <h3 className={styles.listItemTitle}>{notification.title}</h3>

      <Link href={notification.redirectUrl} className={styles.listItemLink} onClick={() => setIsOpen(false)}>
        <Export />
      </Link>
    </div>
  );
};

export default NotificationListItem;
