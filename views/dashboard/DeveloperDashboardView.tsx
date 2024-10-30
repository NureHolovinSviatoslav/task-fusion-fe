import { useMemo } from 'react';

import { ListView } from '@/components/common/ListView';
import { TextWithIcon } from '@/components/common/TextWithIcon';
import { getDeveloperProjects } from '@/utils/api/queries';
import { mapDeveloperProjectsToListItems } from '@/utils/helpers';

import styles from './dashboard.module.scss';

export const DeveloperDashboardView = async () => {
  const data = await getDeveloperProjects();

  const listItems = useMemo(() => {
    if (!data) {
      return [];
    }

    return mapDeveloperProjectsToListItems(data);
  }, [data]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h1>Developer Dashboard</h1>
      </div>

      <div className="contentWrapper">
        <ListView
          title="Projects"
          rightElement={data.length ? <TextWithIcon iconName="export" text="Export" isClickable /> : null}
          listItems={listItems}
        />
      </div>
    </div>
  );
};
