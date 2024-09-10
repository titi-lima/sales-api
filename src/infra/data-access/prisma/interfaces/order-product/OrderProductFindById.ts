import type { Prisma, OrderProduct, Product } from '@prisma/client';

export namespace IOrderProductFindById {
  export type Input = Prisma.OrderProductWhereUniqueInput['id'];
  export type Output = OrderProduct & { product: Product };
}
