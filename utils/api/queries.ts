import {
  ActionsResponse,
  ClientProjectResponse,
  CommentsResponse,
  DeveloperInviteResponse,
  DeveloperProjectResponse,
  NotificationsResponse,
  PaymentRequestsWithProjectResponse,
  PaymentRequestWithProjectResponse,
  PmInviteResponse,
  PmProjectResponse,
  ProfileResponse,
  ProjectDeveloperUsersResponse,
  ProjectPmUserResponse,
  ProjectResponse,
  ProjectUsersResponse,
  TaskResponse,
  TasksResponse,
  ValidateAccessToProjectResponse,
  ValidateAccessToTaskResponse,
} from '@/types';
import { TaskStatus } from '@/types/enums';

import { externalApiClient } from '../externalApiClient';

export const getMyProfile = async (): Promise<ProfileResponse> => {
  const response = await externalApiClient.get<ProfileResponse>('/users/profile');

  return response.data;
};

export const getClientProjects = async (): Promise<ClientProjectResponse> => {
  const response = await externalApiClient.get<ClientProjectResponse>('/projects/get-client-projects');

  return response.data;
};

export const getDeveloperProjects = async (): Promise<DeveloperProjectResponse> => {
  const response = await externalApiClient.get<DeveloperProjectResponse>('/projects/get-developer-projects');

  return response.data;
};

export const getPmProjects = async (): Promise<PmProjectResponse> => {
  const response = await externalApiClient.get<PmProjectResponse>('/projects/get-pm-projects');

  return response.data;
};

export const getProjectById = async (id: string): Promise<ProjectResponse> => {
  const response = await externalApiClient.get<ProjectResponse>(`/projects/${id}`);

  return response.data;
};

export const getTasksByStatus = async (projectId: number, taskStatus: TaskStatus): Promise<TasksResponse> => {
  const response = await externalApiClient.post<TasksResponse>('/tasks/get-tasks-by-status', { projectId, taskStatus });

  return response.data;
};

export const getProjectPmUser = async (projectId: number): Promise<ProjectPmUserResponse> => {
  try {
    const response = await externalApiClient.post<ProjectPmUserResponse>('/projects/get-project-pm-user', {
      projectId,
    });

    return response.data;
  } catch (error) {
    return null;
  }
};

export const getProjectDeveloperUsers = async (projectId: number): Promise<ProjectDeveloperUsersResponse> => {
  const response = await externalApiClient.post<ProjectDeveloperUsersResponse>(
    '/projects/get-project-developer-users',
    {
      projectId,
    },
  );

  return response.data;
};

export const getProjectUsers = async (projectId: number): Promise<ProjectUsersResponse> => {
  const response = await externalApiClient.post<ProjectUsersResponse>('/projects/get-project-users', {
    projectId,
  });

  return response.data;
};

export const getTaskById = async (taskId: number): Promise<TaskResponse> => {
  const response = await externalApiClient.get<TaskResponse>('/tasks/' + taskId);

  return response.data;
};

export const getActionsByTaskId = async (taskId: number): Promise<ActionsResponse> => {
  const response = await externalApiClient.get<ActionsResponse>('/actions/get-actions-by-task-id/' + taskId);

  return response.data;
};

export const getCommentsByTaskId = async (taskId: number): Promise<CommentsResponse> => {
  const response = await externalApiClient.get<CommentsResponse>('/comments/get-comments-by-task-id/' + taskId);

  return response.data;
};

export const checkPmEmail = async (email: string) => {
  const response = await externalApiClient.post('/users/check-pm-email', { email });

  return response.data;
};

export const checkDeveloperEmail = async (email: string) => {
  const response = await externalApiClient.post('/users/check-developer-email', { email });

  return response.data;
};

export const getPmInviteById = async (id: number) => {
  const response = await externalApiClient.post<PmInviteResponse>('/projects/invites/get-pm-invite-by-id', { id });

  return response.data;
};

export const getDeveloperInviteById = async (id: number) => {
  const response = await externalApiClient.post<DeveloperInviteResponse>(
    '/projects/invites/get-developer-invite-by-id',
    {
      id,
    },
  );

  return response.data;
};

export const getMyTasksByStatus = async (taskStatus: TaskStatus) => {
  const response = await externalApiClient.post<TasksResponse>('/tasks/get-user-tasks-by-status', {
    status: taskStatus,
  });

  return response.data;
};

export const getClientPaymentRequests = async () => {
  const response = await externalApiClient.get<PaymentRequestsWithProjectResponse>(
    '/payments/get-client-payment-requests',
  );

  return response.data;
};

export const getPaymentRequestById = async (paymentRequestId: number) => {
  const response = await externalApiClient.get<PaymentRequestWithProjectResponse>(
    `/payments/get-payment-request-by-id/${paymentRequestId}`,
  );

  return response.data.paymentRequest;
};

export const getUserNotitifications = async () => {
  const response = await externalApiClient.get<NotificationsResponse>('/notifications');

  return response.data;
};

export const validateAccessToProject = async (projectId: number) => {
  const response = await externalApiClient.get<ValidateAccessToProjectResponse>(
    `/projects/validate-access-to-project/${projectId}`,
  );

  return response.data;
};

export const validateAccessToTask = async (taskId: number) => {
  const response = await externalApiClient.get<ValidateAccessToTaskResponse>(
    `/tasks/validate-access-to-task/${taskId}`,
  );

  return response.data;
};
