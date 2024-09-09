import type { Client, Prisma, User } from '@prisma/client';
import type { StrictOmit } from 'src/shared/types/StrictOmit';

export namespace IUserFindAll {
  export type Input = Prisma.UserWhereInput;
  export type Output = StrictOmit<User, 'password'> & { Client: Client | null };
  export type Options = {
    limit?: number;
    offset?: number;
  };
}
