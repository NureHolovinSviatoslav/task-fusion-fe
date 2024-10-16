import { ImFileEmpty } from 'react-icons/im';

import styles from './NoData.module.scss';

export const NoData = () => (
  <div className={styles.noDataWrapper}>
    <ImFileEmpty />

    <p>No data</p>
  </div>
);
