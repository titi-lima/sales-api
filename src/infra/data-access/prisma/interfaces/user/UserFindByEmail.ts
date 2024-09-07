import type { Prisma, User } from '@prisma/client';
import type { StrictOmit } from 'src/shared/types/Exact';

export namespace IUserFindByEmail {
  export type Input = Prisma.UserWhereUniqueInput['email'];
  export type Output = StrictOmit<User, 'password'>;
}
