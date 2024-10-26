import { addHours, format } from 'date-fns';

import { Avatar } from '@/components/common/Avatar';
import { Props as ColumnItemProps } from '@/components/common/ColumnItem';
import { Detail } from '@/components/common/Details';
import { Props as ListItemProps } from '@/components/common/ListItem';
import { PriorityBadge } from '@/components/common/PriorityBadge';
import { TextWithIcon } from '@/components/common/TextWithIcon';
import {
  Action,
  ClientProjectResponse,
  DeveloperProjectResponse,
  PaymentRequestWithProject,
  PmProjectResponse,
  Task,
} from '@/types';

export const mapTasksToColumns = (tasks: Task[] = []): ColumnItemProps[] => {
  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    rows: [
      {
        name: 'Participants',
        value: task.users.length ? task.users.map((user) => user.name).join(', ') : 'No participants',
      },
      {
        name: 'Date added',
        value: formatDate(task.createdAt),
      },
    ],
    priority: task.taskPriority,
    href: `/projects/${task.projectId}/task/${task.id}`,
  }));
};

export const mapTaskToDetails = (task: Task): Detail[] => {
  return [
    {
      title: 'Priority',
      value: <PriorityBadge priority={task.taskPriority} />,
    },
    {
      title: 'Status',
      value: task.taskStatus,
    },
    {
      title: 'Date added',
      value: formatDate(task.createdAt),
    },
    {
      title: 'Deadline',
      value: formatDate(task.deadline),
    },
    {
      title: 'Participants',
      value: task.users.length ? task.users.map((user) => user.name).join(', ') : 'No participants',
    },
  ];
};

export const mapActionsToColumns = (actions?: Action[]): ColumnItemProps[] => {
  return (
    actions?.map((action) => ({
      id: action.id,
      title: action.title,
      rows: [
        {
          name: 'Date added',
          value: formatDate(action.createdAt),
        },
      ],
      author: <Avatar name={action.user.name} />,
    })) || []
  );
};

export const mapDeveloperProjectsToListItems = (projects: DeveloperProjectResponse): ListItemProps[] => {
  return projects.map((project) => ({
    title: project.title,
    data: [
      <TextWithIcon key={1} iconName="sunrise" text={formatDate(project.createdAt)} />,
      <TextWithIcon key={2} iconName="sunset" text={formatDate(project.deadline)} />,
      <TextWithIcon key={3} iconName="people" text={project.pmUser.name} />,
    ],
    right: project.id,
    href: `projects/${project.id}`,
  }));
};

export const mapPmProjectsToListItems = (projects: PmProjectResponse): ListItemProps[] => {
  return projects.map((project) => ({
    title: project.title,
    data: [
      <TextWithIcon key={1} iconName="sunrise" text={formatDate(project.createdAt)} />,
      <TextWithIcon key={2} iconName="sunset" text={formatDate(project.deadline)} />,
      <TextWithIcon
        key={3}
        iconName="people"
        text={project.developerUsers ? project.developerUsers.map((user) => user.name).join(', ') : 'No participants'}
      />,
    ],
    right: project.id,
    href: `projects/${project.id}`,
  }));
};

export const mapClientProjectsToListItems = (projects: ClientProjectResponse): ListItemProps[] => {
  return projects.map((project) => ({
    title: project.title,
    data: [
      <TextWithIcon key={1} iconName="sunrise" text={formatDate(project.createdAt)} />,
      <TextWithIcon key={2} iconName="sunset" text={formatDate(project.deadline)} />,
      <TextWithIcon
        key={3}
        iconName="people"
        text={project.users.length ? project.users.map((user) => user.name).join(', ') : 'No participants'}
      />,
    ],
    right: project.id,
    href: `projects/${project.id}`,
  }));
};

export const mapPaymentRequestsToListItems = (requests: PaymentRequestWithProject[]): ListItemProps[] => {
  return requests.map((request) => ({
    title: `Payment Request for ${request.project?.title || 'unknown project'}`,
    data: [
      <TextWithIcon key={1} iconName="sunrise" text={formatDate(request.paymentPeriodStartDate)} />,
      <TextWithIcon key={2} iconName="sunset" text={formatDate(request.paymentPeriodEndDate)} />,
      <TextWithIcon key={3} iconName="check" text={request.status} />,
    ],
    right: request.project?.id,
    href: request.project ? `projects/${request.project.id}/payment-request/${request.id}` : undefined,
  }));
};

export const mapPathnameToLocationArray = (pathname: string): string[] => {
  return pathname
    .split('/')
    .filter((item) => item.length)
    .map((item) => capitalizeFirstLetter(item.replace('/', '')));
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (deadline: Date | string) => {
  const zonedDate = new Date(deadline);

  return format(addHours(zonedDate, 2), 'MM/dd/yyyy, h:mm a');
};
