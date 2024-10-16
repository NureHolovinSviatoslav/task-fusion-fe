import classNames from 'classnames';

import { TaskPriority } from '@/types/enums';

import styles from './PriorityBadge.module.scss';

export type Props = {
  priority: TaskPriority;
};

export const PriorityBadge = (props: Props) => {
  const { priority } = props;

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles.green]: priority === TaskPriority.LOW,
        [styles.orange]: priority === TaskPriority.MEDIUM,
        [styles.red]: priority === TaskPriority.HIGH,
      })}
    >
      {priority}
    </div>
  );
};
