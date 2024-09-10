import {
  PrismaOrderRepository,
  PrismaProductRepository,
} from '@prisma-repositories';
import { UpdateOrderUseCase } from 'src/application/use-cases/order/update';
import { PaymentService } from 'src/infra/external/payment';

export const makeUpdateOrderUseCase = () => {
  const orderRepository = new PrismaOrderRepository();
  const paymentService = new PaymentService();
  const productRepository = new PrismaProductRepository();

  return new UpdateOrderUseCase(
    orderRepository,
    productRepository,
    paymentService,
  );
};
