import type { Prisma, OrderProduct } from '@prisma/client';

export namespace IOrderProductUpdate {
  export type Input = Prisma.OrderProductUpdateInput;
  export type Where = Prisma.OrderProductWhereUniqueInput;
  export type Output = OrderProduct;
}
