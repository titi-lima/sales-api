import type { Prisma, Order, OrderProduct, Client } from '@prisma/client';

export namespace IOrderFindByClient {
  export type Input = string;
  export type Output = Order & { orderProducts: OrderProduct[] | null } & {
    client: Client | null;
  };
}
