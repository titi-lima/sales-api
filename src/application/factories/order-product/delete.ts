import { PrismaOrderProductRepository } from '@prisma-repositories';
import { DeleteOrderProductUseCase } from 'src/application/use-cases/order-product/delete';

export const makeDeleteOrderProductUseCase = () => {
  const orderProductRepository = new PrismaOrderProductRepository();
  return new DeleteOrderProductUseCase(orderProductRepository);
};
