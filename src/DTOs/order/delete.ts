import { z } from 'zod';

export const DeleteOrderWhereDTO = z.object({
  id: z.string({ required_error: 'Id is required' }),
});

export type IDeleteOrderWhereDTO = z.infer<typeof DeleteOrderWhereDTO>;
