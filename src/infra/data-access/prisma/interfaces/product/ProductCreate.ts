import type { Prisma, Product } from '@prisma/client';

export namespace IProductCreate {
  /**
   * type is ommited because public admin creation should not be allowed.
   */
  export type Input = Prisma.ProductCreateInput;
  export type Output = Product;
}
