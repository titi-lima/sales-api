import { z } from 'zod';

export const CreateUserDTO = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email(),
  password: z.string({ required_error: 'Password is required' }).min(8, {
    message: 'Password must be at least 8 characters long',
  }),
  name: z.string({ required_error: 'Name is required' }),
  contact: z.string({ required_error: 'Contact is required' }),
  address: z.string({ required_error: 'Address is required' }),
});

export type ICreateUserDTO = z.infer<typeof CreateUserDTO>;
