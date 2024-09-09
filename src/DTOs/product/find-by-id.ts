import { z } from 'zod';

export const FindByIdProductWhereDTO = z.object({
  id: z.string({ required_error: 'Id is required' }),
});

export type IFindByIdProductWhereDTO = z.infer<typeof FindByIdProductWhereDTO>;
