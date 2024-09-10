import { z } from 'zod';
import { CreateOrderProductDTO } from './create';

export const UpdateOrderProductDTO = CreateOrderProductDTO.partial();

export const UpdateOrderProductWhereDTO = z.object({
  orderProductId: z.string(),
});

export type IUpdateOrderProductDTO = z.infer<typeof UpdateOrderProductDTO>;

export type IUpdateOrderProductWhereDTO = z.infer<
  typeof UpdateOrderProductWhereDTO
>;
