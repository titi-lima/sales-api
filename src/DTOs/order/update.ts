import { z } from 'zod';

export const UpdateOrderDTO = z.object({
  status: z.enum(['CART', 'RECEIVED', 'PENDING', 'SHIPPED', 'DELIVERED']),
});

export const UpdateOrderWhereDTO = z.object({
  id: z.string(),
});

export type IUpdateOrderDTO = z.infer<typeof UpdateOrderDTO>;

export type IUpdateOrderWhereDTO = z.infer<typeof UpdateOrderWhereDTO>;
