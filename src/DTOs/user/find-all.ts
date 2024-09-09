import { z } from 'zod';

export const FindAllUserWhereDTO = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  limit: z.number({ invalid_type_error: 'Limit must be a number' }).optional(),
  offset: z
    .number({ invalid_type_error: 'Offset must be a number' })
    .optional(),
});

export type IFindAllUserWhereDTO = z.infer<typeof FindAllUserWhereDTO>;
