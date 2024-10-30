import moment from 'moment-timezone';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';

import { Button } from '@/components/common/Button';
import { ListView } from '@/components/common/ListView';
import { TextWithIcon } from '@/components/common/TextWithIcon';
import { getClientPaymentRequests, getClientProjects } from '@/utils/api/queries';
// import { mapPaymentRequestsToListItems } from '@/utils/helpers';

import styles from './dashboard.module.scss';

export const ClientDashboardView = async () => {
  const projects = await getClientProjects();
  // const paymentRequests = await getClientPaymentRequests();

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h1>Client Dashboard</h1>

        <Link href="projects/create">
          <Button text="Create new project" bgColor="orange" textColor="white" icon={<BiPlus />} />
        </Link>
      </div>

      <div className="contentWrapper">
        <ListView
          title="Projects"
          rightElement={projects.length ? <TextWithIcon iconName="export" text="Export" isClickable /> : null}
          listItems={projects.map((project) => ({
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
                text={
                  project.users
                    .map((user) => user.name)
                    .join(', ')
                    .trim() || 'No participants'
                }
              />,
            ],
            right: project.id,
            href: `projects/${project.id}`,
          }))}
        />

        {/* <ListView title="Payments" listItems={mapPaymentRequestsToListItems(paymentRequests)} /> */}
      </div>
    </div>
  );
};
