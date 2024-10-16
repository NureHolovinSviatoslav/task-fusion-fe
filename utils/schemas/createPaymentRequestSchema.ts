import { z } from 'zod';

export const createPaymentRequestSchema = z.object({
  usdAmount: z.string().refine(
    (v) => {
      const n = Number(v);

      return !isNaN(n) && v?.length > 0;
    },
    { message: 'Invalid number' },
  ),
  comment: z.string().min(1, 'Comment is required'),
  startDate: z.string(),
  endDate: z.string(),
});

export type CreatePaymentRequestValues = z.infer<typeof createPaymentRequestSchema>;
