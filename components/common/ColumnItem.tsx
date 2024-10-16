import Link from 'next/link';
import React from 'react';
import { ReactNode } from 'react';

import { PriorityBadge } from '@/components/common/PriorityBadge';
import { TaskPriority } from '@/types/enums';

import styles from './ColumnItem.module.scss';

export type ColumnItemRow = {
  name: string;
  value: string;
};

export type Props = {
  id: number;
  title: string;
  rows: ColumnItemRow[];
  priority?: TaskPriority;
  text?: string;
  author?: ReactNode;
  href?: string;
  isDraggable?: boolean;
};

export const ColumnItem = (props: Props) => {
  const { id, title, rows, priority, text, author, href, isDraggable } = props;

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('taskId', id.toString());
  };

  const item = (
    <div className={styles.wrapper} draggable={isDraggable} onDragStart={handleDragStart}>
      <div className={styles.headerWrapper}>
        <p className={styles.title}>{title}</p>
        {priority && <PriorityBadge priority={priority} />}
      </div>

      <div className={styles.contentWrapper}>
        {rows.map((row) => (
          <div key={row.name} className={styles.row}>
            <p className={styles.name}>{row.name}:</p>
            <p className={styles.value}>{row.value}</p>
          </div>
        ))}
      </div>

      <p className={styles.text}>{text}</p>
      {author}
    </div>
  );

  if (href) {
    return <Link href={href}>{item}</Link>;
  }

  return item;
};
