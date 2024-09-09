import type { Prisma, Product } from '@prisma/client';

export namespace IProductUpdate {
  export type Input = Prisma.ProductUpdateInput;
  export type Where = Prisma.ProductWhereUniqueInput;
  export type Output = Product;
}
