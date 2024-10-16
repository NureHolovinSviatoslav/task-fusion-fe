import Link from 'next/link';

import { Button } from '@/components/common/Button';

import styles from './common.module.scss';

export const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Not Found</h2>

      <p className={styles.text}>Some data couldn't be loaded, please try again later</p>

      <Link href="/" className={styles.link}>
        <Button text="Back to main page" bgColor="blue" />
      </Link>
    </div>
  );
};
