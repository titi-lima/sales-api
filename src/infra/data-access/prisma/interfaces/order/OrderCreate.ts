import type { Prisma, Order, OrderProduct } from '@prisma/client';

export namespace IOrderCreate {
  export type Input = Prisma.OrderCreateInput;
  export type Output = Order & { orderProducts: OrderProduct[] | null };
}
