import { z } from 'zod';

export const FindAllUserWhereDTO = z.object({
  name: z.string().optional(),
  email: z.string().optional(), // since we are using "contains" at the query level, we do not need to validate the email.
  limit: z.coerce
    .number({ invalid_type_error: 'Limit must be a number' })
    .optional(),
  offset: z.coerce
    .number({ invalid_type_error: 'Offset must be a number' })
    .optional(),
});

export type IFindAllUserWhereDTO = z.infer<typeof FindAllUserWhereDTO>;
