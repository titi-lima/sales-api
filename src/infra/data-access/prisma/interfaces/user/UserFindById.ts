import type { Prisma, User } from '@prisma/client';
import type { StrictOmit } from 'src/shared/types/StrictOmit';

export namespace IUserFindById {
  export type Input = Prisma.UserWhereUniqueInput['id'];
  export type Output = StrictOmit<User, 'password'>;
}
