import type {
  Prisma,
  OrderProduct,
  Product,
  Order,
  Client,
} from '@prisma/client';

export namespace IOrderProductFindById {
  export type Input = Prisma.OrderProductWhereUniqueInput['id'];
  export type Output = OrderProduct & { product: Product } & {
    order: Order & { client: Client | null };
  };
}
