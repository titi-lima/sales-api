import {
  PrismaOrderProductRepository,
  PrismaOrderRepository,
  PrismaProductRepository,
} from '@prisma-repositories';
import { CreateOrderProductUseCase } from 'src/application/use-cases/order-product/create';

export const makeCreateOrderProductUseCase = () => {
  const orderProductRepository = new PrismaOrderProductRepository();
  const orderRepository = new PrismaOrderRepository();
  const productRepository = new PrismaProductRepository();

  return new CreateOrderProductUseCase(
    orderProductRepository,
    orderRepository,
    productRepository,
  );
};
