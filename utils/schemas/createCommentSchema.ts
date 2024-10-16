import { z } from 'zod';

export const createCommentSchema = z.object({
  comment: z.string(),
});

export type CreateCommentFormValues = z.infer<typeof createCommentSchema>;
