import {
  PrismaOrderProductRepository,
  PrismaOrderRepository,
  PrismaProductRepository,
} from '@prisma-repositories';
import { UpdateOrderProductUseCase } from 'src/application/use-cases/order-product/update';

export const makeUpdateOrderProductUseCase = () => {
  const orderProductRepository = new PrismaOrderProductRepository();
  const orderRepository = new PrismaOrderRepository();
  const productRepository = new PrismaProductRepository();

  return new UpdateOrderProductUseCase(
    orderProductRepository,
    orderRepository,
    productRepository,
  );
};
