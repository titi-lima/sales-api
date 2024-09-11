import { z } from 'zod';

export const FindByIdOrderWhereDTO = z.object({
  id: z.string({ required_error: 'Id is required' }),
});

export type IFindByIdOrderWhereDTO = z.infer<typeof FindByIdOrderWhereDTO>;
