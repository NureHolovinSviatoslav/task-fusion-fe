import { z } from 'zod';

export const createProjectSchema = z.object({
  title: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  deadline: z.string().min(1, 'Deadline is required'),
});

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>;
