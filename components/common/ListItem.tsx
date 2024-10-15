import classNames from 'classnames';
import Link from 'next/link';
import { ReactNode } from 'react';

import styles from './ListItem.module.scss';

export type Props = {
  title: string;
  data: ReactNode[];
  right?: ReactNode;
  type?: 'column' | 'row';
  href?: string;
};

export const ListItem = (props: Props) => {
  const { title, data, type = 'column', href } = props;

  const link = (
    <div className={styles.wrapper}>
      <div className={classNames(type === 'row' ? styles.rowWrapper : styles.columnWrapper)}>
        <p className={styles.title}>{title}</p>

        <div className={type === 'column' ? styles.columns : styles.rows}>{data}</div>
      </div>

      {type === 'row' && props.right}
    </div>
  );

  if (href) {
    return <Link href={href}>{link}</Link>;
  }

  return link;
};
