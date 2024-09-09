import type { Prisma } from '@prisma/client';

export namespace IProductDelete {
  export type Input = Prisma.ProductWhereUniqueInput;
  export type Output = void;
}
