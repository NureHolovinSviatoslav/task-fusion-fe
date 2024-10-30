import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().min(1, 'Description is required').max(500, 'Description must be 500 characters or less'),
  deadline: z.string().min(1, 'Deadline is required'),
});

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>;
