import { ListView } from '@/components/common/ListView';
import { Loader } from '@/components/common/Loader';
import { TextWithIcon } from '@/components/common/TextWithIcon';
import { usePmProjects } from '@/hooks/usePmProjects';
import { formatDate } from '@/utils/helpers';

import styles from './dashboard.module.scss';

export const PmDashboardView = () => {
  const { data, isLoading } = usePmProjects();

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <h1>Project Manager Dashboard</h1>

      <div className="contentWrapper">
        <ListView
          title="Projects"
          rightElement={data.length ? <TextWithIcon iconName="export" text="Export" isClickable /> : null}
          listItems={data.map((project) => ({
            title: project.title,
            data: [
              <TextWithIcon key={1} iconName="sunrise" text={formatDate(project.createdAt)} />,
              <TextWithIcon key={2} iconName="sunset" text={formatDate(project.deadline)} />,
              <TextWithIcon
                key={3}
                iconName="people"
                text={project.developerUsers.map((user) => user.name).join(', ')}
              />,
            ],
            right: project.id,
            href: `projects/${project.id}`,
          }))}
        />
      </div>
    </div>
  );
};
