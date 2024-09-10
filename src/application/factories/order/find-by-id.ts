import { PrismaOrderRepository } from '@prisma-repositories';
import { FindByIdOrderUseCase } from 'src/application/use-cases/order/find-by-id';

export const makeFindByIdOrderUseCase = () => {
  const orderRepository = new PrismaOrderRepository();
  return new FindByIdOrderUseCase(orderRepository);
};
