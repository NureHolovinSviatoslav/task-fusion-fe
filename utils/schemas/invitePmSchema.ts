import { z } from 'zod';

import { checkPmEmail } from '@/utils/api/queries';

export const invitePmSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .refine(
      async (email) => {
        try {
          await checkPmEmail(email);

          return true;
        } catch {
          return false;
        }
      },
      {
        message: 'PM does not exist',
      },
    ),
});

export type InvitePmFormValues = z.infer<typeof invitePmSchema>;
