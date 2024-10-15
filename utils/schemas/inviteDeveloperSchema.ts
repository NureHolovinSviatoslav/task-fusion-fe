import { z } from 'zod';

import { checkDeveloperEmail } from '@/utils/api/queries';

export const inviteDeveloperSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .refine(
      async (email) => {
        try {
          await checkDeveloperEmail(email);

          return true;
        } catch {
          return false;
        }
      },
      {
        message: 'Developer does not exist',
      },
    ),
});

export type InviteDeveloperFormValues = z.infer<typeof inviteDeveloperSchema>;
