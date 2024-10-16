import moment from 'moment';

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
        value: moment(task.createdAt).format('MM/DD/YYYY, h:mm a'),
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
      value: moment(task.createdAt).format('MM/DD/YYYY, h:mm a'),
    },
    {
      title: 'Deadline',
      value: moment(task.deadline).format('MM/DD/YYYY, h:mm a'),
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
          value: moment(action.createdAt).format('MM/DD/YYYY, h:mm a'),
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
      <TextWithIcon key={1} iconName="sunrise" text={moment(project.deadline).format('MM/DD/YYYY, h:mm a')} />,
      <TextWithIcon
        key={2}
        iconName="sunset"
        text={moment.utc(project.deadline).local().format('MM/DD/YYYY, h:mm a')}
      />,
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
      <TextWithIcon key={1} iconName="sunrise" text={moment(project.deadline).format('MM/DD/YYYY, h:mm a')} />,
      <TextWithIcon
        key={2}
        iconName="sunset"
        text={moment.utc(project.deadline).local().format('MM/DD/YYYY, h:mm a')}
      />,
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
      <TextWithIcon key={1} iconName="sunrise" text={moment(project.deadline).format('MM/DD/YYYY, h:mm a')} />,
      <TextWithIcon
        key={2}
        iconName="sunset"
        text={moment.utc(project.deadline).local().format('MM/DD/YYYY, h:mm a')}
      />,
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
      <TextWithIcon
        key={1}
        iconName="sunrise"
        text={moment(request.paymentPeriodStartDate).format('MM/DD/YYYY, h:mm a')}
      />,
      <TextWithIcon
        key={2}
        iconName="sunset"
        text={moment.utc(request.paymentPeriodEndDate).format('MM/DD/YYYY, h:mm a')}
      />,
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
