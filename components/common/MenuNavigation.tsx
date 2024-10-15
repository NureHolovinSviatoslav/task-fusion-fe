'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

import { useMyProfile } from '@/hooks/useUserProfile';

import { Loader } from './Loader';
import styles from './MenuNavigation.module.scss';

export const MenuNavigation = () => {
  const { data, isLoading } = useMyProfile();

  const pathname = usePathname();

  const content = useMemo(() => {
    if (isLoading) {
      return <Loader isSmall />;
    }

    if (data) {
      return (
        <>
          <Link
            className={classNames(styles.listItem, {
              [styles.active]: pathname.includes('dashboard'),
            })}
            href="/dashboard"
          >
            Dashboard
          </Link>

          <Link
            className={classNames(styles.listItem, {
              [styles.active]: pathname === '/profile',
            })}
            href="/profile"
          >
            Profile
          </Link>
        </>
      );
    }

    return (
      <>
        <Link
          className={classNames(styles.listItem, {
            [styles.active]: pathname.includes('login'),
          })}
          href="/auth/login"
        >
          Log in
        </Link>

        <Link
          className={classNames(styles.listItem, {
            [styles.active]: pathname.includes('signup'),
          })}
          href="/auth/signup"
        >
          Sign up
        </Link>
      </>
    );
  }, [data, isLoading, pathname]);

  return <nav className={styles.nav}>{content}</nav>;
};
