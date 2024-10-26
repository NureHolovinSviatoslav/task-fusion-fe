import { formatDate } from '@/utils/helpers';

import { Avatar } from './Avatar';
import styles from './Comment.module.scss';

type Props = {
  name: string;
  text: string;
  date: Date;
};

export const Comment = (props: Props) => {
  const { name, text, date } = props;

  return (
    <div className={styles.commentWrapper}>
      <div className={styles.commentDetails}>
        <Avatar name={name} />

        <p className={styles.date}>{formatDate(date)}</p>
      </div>

      <p className={styles.text}>{text || 'No text'}</p>
    </div>
  );
};
