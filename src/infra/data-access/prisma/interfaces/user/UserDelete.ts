import type { Prisma } from '@prisma/client';

export namespace IUserDelete {
  export type Input = Prisma.UserWhereUniqueInput;
  export type Output = void;
}
