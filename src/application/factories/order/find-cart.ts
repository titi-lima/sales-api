import { PrismaOrderRepository } from '@prisma-repositories';
import { FindCartUseCase } from 'src/application/use-cases/order/find-cart';

export const makeFindCartUseCase = () => {
  const orderRepository = new PrismaOrderRepository();
  return new FindCartUseCase(orderRepository);
};
