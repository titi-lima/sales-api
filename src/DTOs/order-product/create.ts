import { z } from 'zod';

export const CreateOrderProductDTO = z.object({
  quantity: z.coerce.number(),
  productId: z.string(),
});

export type ICreateOrderProductDTO = z.infer<typeof CreateOrderProductDTO>;
