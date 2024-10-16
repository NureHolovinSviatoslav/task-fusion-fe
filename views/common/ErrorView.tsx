import Link from 'next/link';

import { Button } from '@/components/common/Button';

import styles from './common.module.scss';

type Props = {
  error: Error & { digest?: string };
};

export const ErrorView = (props: Props) => {
  const { error } = props;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Something went wrong!</h2>

      <p className={styles.text}>{error.message}</p>

      <Link href="/" className={styles.link}>
        <Button text="Back to main page" bgColor="blue" />
      </Link>
    </div>
  );
};
