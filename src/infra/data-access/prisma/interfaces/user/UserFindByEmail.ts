import type { Prisma, User } from '@prisma/client';

export namespace IUserFindByEmail {
  export type Input = Prisma.UserWhereUniqueInput['email'];
  export type Output = User;
}
