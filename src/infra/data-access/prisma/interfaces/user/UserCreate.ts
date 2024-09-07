import type { Prisma, User } from '@prisma/client';
import type { StrictOmit } from 'src/shared/types/Exact';

export namespace IUserCreate {
  /**
   * type is ommited because public admin creation should not be allowed.
   */
  export type Input = StrictOmit<Prisma.UserCreateInput, 'type'>;
  export type Output = StrictOmit<User, 'password'>;
}
