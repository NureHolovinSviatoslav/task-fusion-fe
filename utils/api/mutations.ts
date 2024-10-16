import axios from 'axios';

import { LoginRequest } from '@/app/api/login/route';
import { SignupRequest } from '@/app/api/signup/route';
import { CheckoutSessionResponse, JwtTokensResponse, TaskResponse, UserIdResponse } from '@/types';
import { TaskPriority, TaskStatus, UserType } from '@/types/enums';
import { CreateProjectFormValues } from '@/utils/schemas/createProjectSchema';

import { externalApiClient } from '../externalApiClient';
import { CreateCommentFormValues } from '../schemas/createCommentSchema';
import { CreateTaskFormValues } from '../schemas/createTaskSchema';

export const createUser = async (data: SignupRequest) => {
  const { email, name, password, description, position, telegramId } = data;

  const endpointUrl = (() => {
    if (position === UserType.CLIENT) {
      return '/auth/create-client';
    }

    if (position === UserType.DEVELOPER) {
      return '/auth/create-developer';
    }

    return '/auth/create-pm';
  })();

  return externalApiClient.post<JwtTokensResponse>(endpointUrl, {
    email,
    name,
    password,
    description,
    position,
    telegramId: telegramId || null,
  });
};

export const removeRefreshToken = async (accessToken: string) => {
  return externalApiClient.post<UserIdResponse>(
    '/auth/logout',
    {},
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
};

export const login = async (data: LoginRequest) => {
  const { email, password } = data;

  return externalApiClient.post<JwtTokensResponse>('/auth/login', { email, password });
};

export const refreshTokens = async (refreshToken: string) => {
  return axios.post<JwtTokensResponse>(
    '/auth/refresh-tokens',
    {},
    {
      headers: { Authorization: `Bearer ${refreshToken}` },
      baseURL: process.env.NEXT_PUBLIC_EXTERNAL_API_URL,
    },
  );
};

export const createProject = async (data: CreateProjectFormValues & { clientUserId: number }) => {
  const { title, description, deadline, clientUserId } = data;

  return externalApiClient.post('/projects/create-project', {
    title,
    description,
    deadline,
    clientUserId,
  });
};

export const createTask = async (data: CreateTaskFormValues & { projectId: number }) => {
  const { title, description, deadline, projectId, taskPriority, taskStatus } = data;

  return externalApiClient.post<TaskResponse>('/tasks/create-task', {
    title,
    description,
    deadline,
    projectId,
    taskPriority,
    taskStatus,
  });
};

export const createComment = async (data: CreateCommentFormValues & { taskId: number }) => {
  const { comment, taskId } = data;

  return externalApiClient.post('/comments/create-comment', {
    text: comment,
    taskId,
  });
};

export const changeTaskStatus = async (data: { taskId: number; taskStatus: TaskStatus }) => {
  return externalApiClient.post('/tasks/change-task-status', data);
};

export const changeTaskPriority = async (data: { taskId: number; taskPriority: TaskPriority }) => {
  return externalApiClient.post('/tasks/change-task-priority', data);
};

export const assignTaskToUser = async (data: { taskId: number; userId: number }) => {
  return externalApiClient.post('/tasks/assign-task-to-user', data);
};

export const unassignTaskFromUser = async (data: { taskId: number; userId: number }) => {
  return externalApiClient.post('/tasks/unassign-task-from-user', data);
};

export const createPmInvite = async (data: { email: string; projectId: number }) => {
  return externalApiClient.post('/projects/invites/invite-pm', data);
};

export const createDeveloperInvite = async (data: { email: string; projectId: number }) => {
  return externalApiClient.post('/projects/invites/invite-developer', data);
};

export const acceptPmInvite = async (data: { inviteId: number }) => {
  return externalApiClient.post('/projects/invites/accept-pm-invite', data);
};

export const rejectPmInvite = async (data: { inviteId: number }) => {
  return externalApiClient.post('/projects/invites/reject-pm-invite', data);
};

export const acceptDeveloperInvite = async (data: { inviteId: number }) => {
  return externalApiClient.post('/projects/invites/accept-developer-invite', data);
};

export const rejectDeveloperInvite = async (data: { inviteId: number }) => {
  return externalApiClient.post('/projects/invites/reject-developer-invite', data);
};

export const createPaymentRequest = async (data: {
  usdAmount: number;
  comment: string;
  projectId: number;
  clientUserId: number;
  paymentPeriodStartDate: string;
  paymentPeriodEndDate: string;
}) => {
  return externalApiClient.post('/payments/create-payment-request', data);
};

export const rejectPaymentRequest = async (data: { paymentRequestId: string }) => {
  return externalApiClient.post('/payments/reject-payment-request', {
    paymentRequestId: +data.paymentRequestId,
  });
};

export const createCheckoutSession = async (data: {
  usdAmount: number;
  projectId: string;
  paymentRequestId: string;
}) => {
  return externalApiClient.post<CheckoutSessionResponse>('/payments/create-checkout-session', {
    usdAmount: data.usdAmount,
    projectId: +data.projectId,
    paymentRequestId: +data.paymentRequestId,
  });
};

export const readMyNotifications = async () => {
  return externalApiClient.post('/notifications/read-my-notifications');
};
