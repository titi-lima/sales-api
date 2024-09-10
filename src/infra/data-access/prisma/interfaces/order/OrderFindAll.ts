import type { Prisma, Order, OrderProduct } from '@prisma/client';

export namespace IOrderFindAll {
  export type Input = Prisma.OrderWhereInput;
  export type Output = Order & { orderProducts: OrderProduct[] | null };
  export type Options = {
    limit?: number;
    offset?: number;
  };
}
