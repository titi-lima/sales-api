import { z } from 'zod';

export const FindByIdUserWhereDTO = z.object({
  id: z.string({ required_error: 'Id is required' }),
});

export type IFindByIdUserWhereDTO = z.infer<typeof FindByIdUserWhereDTO>;
