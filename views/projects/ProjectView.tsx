'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { BiMoney, BiPlus } from 'react-icons/bi';

import { Button } from '@/components/common/Button';
import { Column } from '@/components/common/Column';
import { Loader } from '@/components/common/Loader';
import { ProjectDetails } from '@/components/common/ProjectDetails';
import TaskSidebar from '@/components/common/TaskSidebar';
import { Plus } from '@/components/svg/Plus';
import { useProjectById } from '@/hooks/useProjectById';
import { useProjectDevelopers } from '@/hooks/useProjectDevelopers';
import { useProjectPmUser } from '@/hooks/useProjectPmUser';
import { useProjectTasksByStatus } from '@/hooks/useProjectTasksByStatus';
import { useMyProfile } from '@/hooks/useUserProfile';
import { useValidateAccessToProject } from '@/hooks/useValidateAccessToProject';
import useTaskSidebar from '@/store/useTaskSidebar';
import { TaskStatus, UserType } from '@/types/enums';
import { mapTasksToColumns } from '@/utils/helpers';

import styles from './projects.module.scss';

type Props = {
  projectId: string;
};

export const ProjectView = (props: Props) => {
  const { projectId } = props;

  const { setTaskSidebarState } = useTaskSidebar();

  const { data: validate, isLoading: isLoadingValidate } = useValidateAccessToProject(projectId);

  const { data: profile, isLoading: isLoadingProfile } = useMyProfile();
  const { data: project, isLoading: isLoadingProject, isError } = useProjectById(projectId);
  const { data: projectDeveloperUsers } = useProjectDevelopers(projectId);
  const { data: projectPmUser, isLoading: isLoadingProjectPm } = useProjectPmUser(projectId);
  const { data: todoTasks, isLoading: isLoadingTodo } = useProjectTasksByStatus(projectId, TaskStatus.TO_DO);
  const { data: progressTasks, isLoading: isLoadingProgress } = useProjectTasksByStatus(
    projectId,
    TaskStatus.IN_PROGRESS,
  );
  const { data: closedTasks, isLoading: isLoadingClosed } = useProjectTasksByStatus(projectId, TaskStatus.CLOSED);
  const { data: frozenTasks, isLoading: isLoadingFrozen } = useProjectTasksByStatus(projectId, TaskStatus.FROZEN);

  const { todoTasksColumn, progressTasksColumn, frozenTasksColumn, closedTasksColumn } = useMemo(() => {
    return {
      todoTasksColumn: mapTasksToColumns(todoTasks),
      progressTasksColumn: mapTasksToColumns(progressTasks),
      frozenTasksColumn: mapTasksToColumns(frozenTasks),
      closedTasksColumn: mapTasksToColumns(closedTasks),
    };
  }, [todoTasks, progressTasks, closedTasks, frozenTasks]);

  if (
    isLoadingProject ||
    isError ||
    !project ||
    isLoadingProjectPm ||
    isLoadingTodo ||
    isLoadingProgress ||
    isLoadingClosed ||
    isLoadingFrozen ||
    isLoadingProfile ||
    isLoadingValidate
  ) {
    return <Loader />;
  }

  if (!validate?.allowed) {
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.text}>You are not allowed to access this project.</h2>;
      </div>
    );
  }

  return (
    <div>
      <div className={styles.titleWrapper}>
        <h1>{project.title}</h1>

        <div className={styles.buttonsWrapper}>
          {profile?.userType === UserType.PM && projectPmUser && projectPmUser.id === profile?.id && (
            <Link href={`/projects/${projectId}/request-payment`}>
              <Button text="Request Payment" bgColor="green" textColor="white" icon={<BiMoney />} />
            </Link>
          )}

          {!projectPmUser && profile?.userType === UserType.CLIENT && (
            <Link href={`/projects/${projectId}/invite-pm`}>
              <Button text="Invite PM" bgColor="orange" textColor="white" icon={<BiPlus />} />
            </Link>
          )}

          {profile?.userType === UserType.PM && projectDeveloperUsers && projectDeveloperUsers.length < 3 && (
            <Link href={`/projects/${projectId}/invite-developer`}>
              <Button text="Invite Developer" bgColor="orange" textColor="white" icon={<BiPlus />} />
            </Link>
          )}
        </div>
      </div>

      <div className="contentWrapper">
        <ProjectDetails projectId={projectId} />

        <div className={styles.taskColumnsWrapper}>
          <Column
            title={TaskStatus.TO_DO}
            projectId={+projectId}
            columns={todoTasksColumn}
            right={
              <Plus
                onClick={() => {
                  setTaskSidebarState(TaskStatus.TO_DO);
                }}
              />
            }
            isDraggable
          />

          <Column
            title={TaskStatus.IN_PROGRESS}
            projectId={+projectId}
            columns={progressTasksColumn}
            right={
              <Plus
                onClick={() => {
                  setTaskSidebarState(TaskStatus.IN_PROGRESS);
                }}
              />
            }
            isDraggable
          />

          <Column
            title={TaskStatus.CLOSED}
            projectId={+projectId}
            columns={closedTasksColumn}
            right={
              <Plus
                onClick={() => {
                  setTaskSidebarState(TaskStatus.CLOSED);
                }}
              />
            }
            isDraggable
          />

          <Column
            title={TaskStatus.FROZEN}
            projectId={+projectId}
            columns={frozenTasksColumn}
            right={
              <Plus
                onClick={() => {
                  setTaskSidebarState(TaskStatus.FROZEN);
                }}
              />
            }
            isDraggable
          />
        </div>
      </div>

      <TaskSidebar projectId={+projectId} />
    </div>
  );
};
