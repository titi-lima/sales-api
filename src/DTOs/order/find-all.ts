import { z } from 'zod';

export const FindAllOrderWhereDTO = z.object({
  clientId: z.string().optional(),
  orderedAtBegin: z.coerce.date().optional(),
  orderedAtEnd: z.coerce.date().optional(),
  status: z
    .enum(['CART', 'RECEIVED', 'PENDING', 'SHIPPED', 'DELIVERED'])
    .optional(),
  limit: z.coerce
    .number({ invalid_type_error: 'Limit must be a number' })
    .optional(),
  offset: z.coerce
    .number({ invalid_type_error: 'Offset must be a number' })
    .optional(),
});

export type IFindAllOrderWhereDTO = z.infer<typeof FindAllOrderWhereDTO>;
