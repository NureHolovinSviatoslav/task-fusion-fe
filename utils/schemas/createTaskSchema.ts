import { z } from 'zod';

import { TaskPriority, TaskStatus } from '@/types/enums';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  taskPriority: z.nativeEnum(TaskPriority),
  taskStatus: z.nativeEnum(TaskStatus),
  deadline: z.string().min(1, 'Deadline is required'),
});

export type CreateTaskFormValues = z.infer<typeof createTaskSchema>;
