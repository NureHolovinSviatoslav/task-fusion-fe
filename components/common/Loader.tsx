import classNames from 'classnames';

import styles from './Loader.module.scss';

type Props = {
  isSmall?: boolean;
};

export const Loader = (props: Props) => (
  <div className={styles.container}>
    <div className={classNames(styles.loader, { [styles.small]: props.isSmall })}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
