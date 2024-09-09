import { z } from 'zod';

export const DeleteUserWhereDTO = z.object({
  id: z.string({ required_error: 'Id is required' }),
});

export type IDeleteUserWhereDTO = z.infer<typeof DeleteUserWhereDTO>;
