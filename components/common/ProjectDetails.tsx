import { useProjectById } from '@/hooks/useProjectById';
import { useProjectDevelopers } from '@/hooks/useProjectDevelopers';
import { useProjectPmUser } from '@/hooks/useProjectPmUser';
import { useProjectTasksByStatus } from '@/hooks/useProjectTasksByStatus';
import { TaskStatus } from '@/types/enums';
import { formatDate } from '@/utils/helpers';

import { Details } from './Details';
import { Loader } from './Loader';
import styles from './ProjectDetails.module.scss';

type Props = {
  projectId: string;
};

export const ProjectDetails = (props: Props) => {
  const { projectId } = props;

  const { data: project, isLoading: isLoadingProject, isError } = useProjectById(projectId);
  const { data: projectDeveloperUsers, isLoading: isLoadingProjectDeveloperUsers } = useProjectDevelopers(projectId);
  const { data: projectPmUser, isLoading: isLoadingProjectPm } = useProjectPmUser(projectId);
  const { data: todoTasks, isLoading: isLoadingTodo } = useProjectTasksByStatus(projectId, TaskStatus.TO_DO);
  const { data: progressTasks, isLoading: isLoadingProgress } = useProjectTasksByStatus(
    projectId,
    TaskStatus.IN_PROGRESS,
  );
  const { data: closedTasks, isLoading: isLoadingClosed } = useProjectTasksByStatus(projectId, TaskStatus.CLOSED);
  const { data: frozenTasks, isLoading: isLoadingFrozen } = useProjectTasksByStatus(projectId, TaskStatus.FROZEN);

  if (
    isLoadingProject ||
    isError ||
    !project ||
    isLoadingProjectPm ||
    isLoadingTodo ||
    isLoadingProgress ||
    isLoadingClosed ||
    isLoadingFrozen ||
    isLoadingProjectDeveloperUsers
  ) {
    return <Loader isSmall />;
  }

  const DETAILS = [
    {
      title: 'Date added',
      value: formatDate(project.createdAt),
    },
    {
      title: 'Deadline',
      value: formatDate(project.deadline),
    },
    {
      title: 'Participants',
      value: projectDeveloperUsers?.map((user) => user.name).join(', ') || 'No participants',
    },
    {
      title: 'PM',
      value: projectPmUser?.name || 'No PM',
    },
  ];

  const DETAIL_STRING = project.description;

  const TASK_DETAILS = [
    {
      title: 'To do',
      value: todoTasks?.length || 0,
    },
    {
      title: 'In progress',
      value: progressTasks?.length || 0,
    },
    {
      title: 'Closed',
      value: closedTasks?.length || 0,
    },
    {
      title: 'Frozen',
      value: frozenTasks?.length || 0,
    },
  ];

  return (
    <div className={styles.detailsWrapper}>
      <Details details={DETAILS} />

      <Details details={DETAIL_STRING} />

      <Details details={TASK_DETAILS} />
    </div>
  );
};
