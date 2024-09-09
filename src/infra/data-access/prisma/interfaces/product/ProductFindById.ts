import type { Prisma, Product } from '@prisma/client';

export namespace IProductFindById {
  export type Input = Prisma.ProductWhereUniqueInput['id'];
  export type Output = Product;
}
