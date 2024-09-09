import { z } from 'zod';
import { CreateUserDTO } from './create';

export const UpdateUserDTO = CreateUserDTO.partial();

export const UpdateUserWhereDTO = z.object({
  id: z.string(),
});

export type IUpdateUserDTO = z.infer<typeof UpdateUserDTO>;

export type IUpdateUserWhereDTO = z.infer<typeof UpdateUserWhereDTO>;
