import { Logo } from '../svg/Logo';

import { MenuNavigation } from './MenuNavigation';
import styles from './Sidebar.module.scss';

export const Sidebar = () => {
  return (
    <aside className={styles.menu}>
      <div>
        <Logo />
      </div>

      <MenuNavigation />
    </aside>
  );
};
