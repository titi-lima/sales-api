import type { Prisma, Order, OrderProduct } from '@prisma/client';

export namespace IOrderUpdate {
  export type Input = Prisma.OrderUpdateInput;
  export type Where = Prisma.OrderWhereUniqueInput;
  export type Output = Order & { orderProducts: OrderProduct[] | null };
}
