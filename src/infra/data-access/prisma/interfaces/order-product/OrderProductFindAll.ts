import type { Prisma, OrderProduct } from '@prisma/client';

export namespace IOrderProductFindAll {
  export type Input = Prisma.OrderProductWhereInput;
  export type Output = OrderProduct[];
}
