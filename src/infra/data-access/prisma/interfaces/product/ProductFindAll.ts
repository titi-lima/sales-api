import type { Prisma, Product } from '@prisma/client';

export namespace IProductFindAll {
  export type Input = Prisma.ProductWhereInput;
  export type Output = Product;
  export type Options = {
    limit?: number;
    offset?: number;
    priceOrderBy?: 'asc' | 'desc';
    available?: boolean;
  };
}
