import type { Prisma, Order, OrderProduct, Client } from '@prisma/client';

export namespace IOrderFindById {
  export type Input = Prisma.OrderWhereUniqueInput['id'];
  export type Output = Order & { orderProducts: OrderProduct[] | null } & {
    client: Client | null;
  };
}
