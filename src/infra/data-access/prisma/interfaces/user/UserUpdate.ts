import type { Client, Prisma, User } from '@prisma/client';
import type { StrictOmit } from 'src/shared/types/StrictOmit';

export namespace IUserUpdate {
  /**
   * type is ommited because public admin creation should not be allowed.
   */
  export type Input = StrictOmit<Prisma.UserUpdateInput, 'type'>;
  export type Where = Prisma.UserWhereUniqueInput;
  export type Output = StrictOmit<User & { Client: Client | null }, 'password'>;
}
