import { z } from 'zod';

export const VerifyEmailDTO = z.object({
  id: z.string(),
});

export type IVerifyEmailDTO = z.infer<typeof VerifyEmailDTO>;
