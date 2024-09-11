import { z } from 'zod';

export const DeleteOrderProductWhereDTO = z.object({
  orderProductId: z.string(),
});

export type IDeleteOrderProductWhereDTO = z.infer<
  typeof DeleteOrderProductWhereDTO
>;
