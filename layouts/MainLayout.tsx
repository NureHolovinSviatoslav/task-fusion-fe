import { headers } from 'next/headers';
import React from 'react';

import '@/styles/normalize.scss';
import '@/styles/globals.scss';
import { MenuNavigation } from '@/components/common/MenuNavigation';
import { NotificationBell } from '@/components/common/NotificationBell';
import { Path } from '@/components/common/Path';
import { ProfileContent } from '@/components/common/ProfileContent';
import { Providers } from '@/components/common/Providers';
import { Logo } from '@/components/svg/Logo';

import styles from './MainLayout.module.scss';

export const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = JSON.parse(headers().get('x-logged-in') || 'false') as boolean;

  return (
    <Providers>
      <div className={styles.container}>
        <aside className={styles.menu}>
          <div>
            <Logo />
          </div>

          <div className={styles.menuContent}>
            <MenuNavigation />

            {isLoggedIn && (
              <div className={styles.notificationProfileWrapper}>
                <div className={styles.bellAndLetter}>
                  <NotificationBell />
                </div>

                <ProfileContent />
              </div>
            )}
          </div>
        </aside>

        <div className={styles.main}>
          <main className={styles.content}>
            <Path />

            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
};
