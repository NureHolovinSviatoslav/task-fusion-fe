import { z } from 'zod';

import { UserType } from '@/types/enums';

export const signupSchema = z
  .object({
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters'),
    description: z.string().min(1, 'Description is required'),
    position: z.enum([UserType.CLIENT, UserType.DEVELOPER, UserType.PM], {
      message: 'Position is required',
    }),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Make sure your passwords match',
    path: ['confirmPassword'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
