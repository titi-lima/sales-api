import { z } from 'zod';

export const FindAllProductWhereDTO = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  available: z.coerce.boolean().optional(),
  priceOrderBy: z.enum(['asc', 'desc']).optional(),
  limit: z.coerce
    .number({ invalid_type_error: 'Limit must be a number' })
    .optional(),
  offset: z.coerce
    .number({ invalid_type_error: 'Offset must be a number' })
    .optional(),
});

export type IFindAllProductWhereDTO = z.infer<typeof FindAllProductWhereDTO>;
