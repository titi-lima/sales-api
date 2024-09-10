import type { Prisma, Order, OrderProduct } from '@prisma/client';

export namespace IOrderFindByClient {
  export type Input = Prisma.OrderWhereInput['clientId'];
  export type Output = Order & { orderProducts: OrderProduct[] | null };
}
