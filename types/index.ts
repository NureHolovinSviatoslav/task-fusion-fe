import { InviteStatus, PaymentRequestStatus, TaskPriority, TaskStatus, UserType } from './enums';

export type Nullable<T> = T | null;

export type JwtTokensResponse = {
  accessToken: string;
  refreshToken: string;
};

export type UserIdResponse = {
  userId: string;
};

export type ClientResponse = {
  id: number;
};

export type DeveloperResponse = {
  id: number;
};

export type PmResponse = {
  id: number;
};

export type ProfileResponse = {
  id: number;
  email: string;
  name: string;
  userType: UserType;
  telegramId?: string;
  description: string;
} & (
  | {
      userType: UserType.CLIENT;
      client: ClientResponse;
    }
  | {
      userType: UserType.DEVELOPER;
      client: DeveloperResponse;
    }
  | {
      userType: UserType.PM;
      client: PmResponse;
    }
);

export type JwtPayload = {
  id: number;
  email: string;
  userType: UserType;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  deadline: Date;
  clientUserId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProjectsResponse = Project[];

export type PmProjectResponse = (Project & {
  developerUsers: (PasswordlessUser & { userType: UserType.DEVELOPER })[];
})[];

export type DeveloperProjectResponse = (Project & {
  pmUser: PasswordlessUser & { userType: UserType.PM };
})[];

export type ClientProjectResponse = (Project & {
  users: PasswordlessUser[];
})[];

export type ProjectResponse = Project;

export type Task = {
  id: number;
  title: string;
  description: string;
  taskPriority: TaskPriority;
  taskStatus: TaskStatus;
  projectId: number;
  developerId: number;
  deadline: Date;
  users: PasswordlessUser[];
  createdAt: Date;
  updatedAt: Date;
};

export type TasksResponse = Task[];

export type TaskResponse = Task;

export type ProjectPmUserResponse = Nullable<PasswordlessUser>;

export type ProjectDeveloperUsersResponse = PasswordlessUser[];

export type ProjectUsersResponse = PasswordlessUser[];

export type PasswordlessUser = {
  id: number;
  email: string;
  name: string;
  description: string;
  telegramId: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
};

export type Action = {
  id: number;
  title: string;
  taskId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  user: PasswordlessUser;
};

export type ActionsResponse = Action[];

export type Comment = {
  id: number;
  taskId: number;
  text: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CommentResponse = Comment & { user: PasswordlessUser };

export type CommentsResponse = CommentResponse[];

export type PmInvite = {
  id: number;
  projectId: number;
  clientUserId: number;
  pmUserId: number;
  expiresAt: Date;
  inviteStatus: InviteStatus;
  createdAt: Date;
  updatedAt: Date;
  project: {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    pmId: number | null;
    clientId: number;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type PmInviteResponse = PmInvite;

export type DeveloperInvite = {
  id: number;
  projectId: number;
  developerUserId: number;
  pmUserId: number;
  expiresAt: Date;
  inviteStatus: InviteStatus;
  createdAt: Date;
  updatedAt: Date;
  project: {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    pmId: number | null;
    clientId: number;
    createdAt: Date;
    updatedAt: Date;
  };
};

export type DeveloperInviteResponse = DeveloperInvite;

export type PaymentRequest = {
  id: number;
  projectId: number;
  clientUserId: number;
  comment: string;
  usdAmount: number;
  paymentPeriodStartDate: string;
  paymentPeriodEndDate: string;
  status: PaymentRequestStatus;
  createdAt: string;
  updatedAt: string;
};

export type PaymentRequestWithProject = PaymentRequest & {
  project: Project | null;
};

export type PaymentRequestWithProjectResponse = {
  paymentRequest: PaymentRequestWithProject;
};
export type PaymentRequestsWithProjectResponse = PaymentRequestWithProject[];

export type CheckoutSessionResponse = {
  url: string;
};

export type Notification = {
  id: number;
  title: string;
  redirectUrl: string;
  isRead: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type NotificationsResponse = Notification[];

export type ValidateAccessToProjectResponse = {
  allowed: boolean;
};

export type ValidateAccessToTaskResponse = {
  allowed: boolean;
};
