import { z } from 'zod';

export const CreateUserDTO = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  contact: z.string(),
  address: z.string(),
});

export type ICreateUserDTO = z.infer<typeof CreateUserDTO>;
