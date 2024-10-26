'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import DefaultAvatar from '@/components/assets/Avatar.png';
import { Column } from '@/components/common/Column';
import { Details } from '@/components/common/Details';
import { ListView } from '@/components/common/ListView';
import { LogoutButtonWrapper } from '@/components/common/LogoutButtonWrapper';
import { TextWithIcon } from '@/components/common/TextWithIcon';
import { Plus } from '@/components/svg/Plus';
import { useDeveloperProjects } from '@/hooks/useDeveloperProjects';
import { useMyTasksByStatus } from '@/hooks/useUserTasksByStatus';
import { ProfileResponse } from '@/types';
import { TaskStatus } from '@/types/enums';
import { mapDeveloperProjectsToListItems, mapTasksToColumns } from '@/utils/helpers';

import styles from './profiles.module.scss';

type Props = {
  profile: ProfileResponse;
};

export const DeveloperProfileView = (props: Props) => {
  const { profile } = props;

  const { data: projects } = useDeveloperProjects();
  const { data: inProgressTasks } = useMyTasksByStatus(TaskStatus.IN_PROGRESS);
  const { data: closedTasks } = useMyTasksByStatus(TaskStatus.CLOSED);

  const mappedProjects = useMemo(() => {
    if (!projects) {
      return [];
    }

    return mapDeveloperProjectsToListItems(projects);
  }, [projects]);

  const mappedInProgressTasks = useMemo(() => {
    if (!inProgressTasks) {
      return [];
    }

    return mapTasksToColumns(inProgressTasks);
  }, [inProgressTasks]);

  const mappedClosedTasks = useMemo(() => {
    if (!closedTasks) {
      return [];
    }

    return mapTasksToColumns(closedTasks);
  }, [closedTasks]);

  const DETAILS = [
    {
      title: 'Position',
      value: profile.userType,
    },
    {
      title: 'Email',
      value: profile.email,
    },
    {
      title: 'ID',
      value: profile.id || 'Not set',
    },
  ];

  return (
    <div>
      <h1>{profile.name}</h1>

      <div className={styles.contentWrapper}>
        <div className={styles.personalDetailsWrapper}>
          <div className={styles.avatarWrapper}>
            <Image src={DefaultAvatar} alt="Avatar" className={styles.avatar} />
          </div>

          <Details details={profile.description} />

          <Details details={DETAILS} />
        </div>

        <div className={styles.technicalDetailsWrapper}>
          <ListView
            title="Projects"
            rightElement={<TextWithIcon iconName="export" text="Export" isClickable />}
            listItems={mappedProjects}
          />

          <div className={styles.tasksWrapper}>
            <Column title="In progress" columns={mappedInProgressTasks} right={<Plus />} />

            <Column title="Closed" columns={mappedClosedTasks} right={<Plus />} />
          </div>
        </div>
      </div>

      <div className={styles.logoutButtonWrapper}>
        <LogoutButtonWrapper />
      </div>
    </div>
  );
};
