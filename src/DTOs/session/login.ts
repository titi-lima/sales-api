import { z } from 'zod';

export const LoginDTO = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type ILoginDTO = z.infer<typeof LoginDTO>;
