'use client';

import { useState } from 'react';

import { useMyNotifications } from '@/hooks/useMyNotifications';

import { Bell } from '../svg/Bell';

import styles from './NotificationBell.module.scss';
import { NotificationList } from './NotificationList';

export const NotificationBell = () => {
  const { data } = useMyNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const handleBellClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.bellContainer}>
      <div className={styles.bell} onClick={handleBellClick}>
        <Bell isActive={data && data.some((notification) => !notification.isRead)} />
      </div>

      {isOpen && (
        <NotificationList
          notifications={data?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || []}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};
