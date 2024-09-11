import { PrismaOrderRepository } from '@prisma-repositories';
import { FindAllOrderUseCase } from 'src/application/use-cases/order/find-all';

export const makeFindAllOrderUseCase = () => {
  const orderRepository = new PrismaOrderRepository();
  return new FindAllOrderUseCase(orderRepository);
};
