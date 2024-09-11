import type { Prisma, OrderProduct } from '@prisma/client';

export namespace IOrderProductCreate {
  export type Input = Prisma.OrderProductCreateInput;
  export type Output = OrderProduct;
}
