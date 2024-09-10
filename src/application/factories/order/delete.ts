import { PrismaOrderRepository } from '@prisma-repositories';
import { DeleteOrderUseCase } from 'src/application/use-cases/order/delete';

export const makeDeleteOrderUseCase = () => {
  const orderRepository = new PrismaOrderRepository();
  return new DeleteOrderUseCase(orderRepository);
};
