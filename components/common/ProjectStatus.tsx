import classNames from 'classnames';

import styles from './ProjectStatus.module.scss';

type Props = {
  status: 'Active' | 'Closed';
};

export const ProjectStatus = (props: Props) => {
  const { status } = props;

  return (
    <div className={styles.statusWrapper}>
      <div className={classNames(status === 'Active' ? styles.activeDotWrapper : styles.closedDotWrapper)} />

      <p>{status}</p>
    </div>
  );
};
