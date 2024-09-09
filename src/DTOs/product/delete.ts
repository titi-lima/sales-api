import { z } from 'zod';

export const DeleteProductWhereDTO = z.object({
  id: z.string({ required_error: 'Id is required' }),
});

export type IDeleteProductWhereDTO = z.infer<typeof DeleteProductWhereDTO>;
