import moment from 'moment-timezone';

import { ListView } from '@/components/common/ListView';
import { TextWithIcon } from '@/components/common/TextWithIcon';
import { getPmProjects } from '@/utils/api/queries';

import styles from './dashboard.module.scss';

export const PmDashboardView = async () => {
  const data = await getPmProjects();

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
              <TextWithIcon key={1} iconName="sunrise" text={moment(project.deadline).format('MM/DD/YYYY, h:mm a')} />,
              <TextWithIcon
                key={2}
                iconName="sunset"
                text={moment.utc(project.deadline).local().format('MM/DD/YYYY, h:mm a')}
              />,
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
