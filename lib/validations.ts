import { z } from 'zod';

export const LoginSchema = z.object({
    login: z.string({
        invalid_type_error: 'Please enter your login.',
    }).min(1),
    password: z.string({
        invalid_type_error: 'Please enter your password.',
    }).min(1)
  });