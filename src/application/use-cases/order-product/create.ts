import type { ICreateOrderProductDTO } from '@DTOs';
import { ProductNotFoundError } from 'src/errors';
import type { IOrderProductRepository } from 'src/infra/data-access/interfaces/OrderProductRepository';
import type { IOrderRepository } from 'src/infra/data-access/interfaces/OrderRepository';
import type { IProductRepository } from 'src/infra/data-access/interfaces/ProductRepository';
import type { Session } from 'src/shared/types/Session';
import { verifyAllowedUserAccess } from 'src/shared/utils/verifyAllowedUserMutation';

export class CreateOrderProductUseCase {
  constructor(
    private orderProductRepository: IOrderProductRepository,
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
  ) {
    this.orderProductRepository = orderProductRepository;
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
  }

  async execute({
    input,
    session,
  }: {
    input: ICreateOrderProductDTO;
    session: Session;
  }) {
    const [existingOrder, product] = await Promise.all([
      this.orderRepository.findByClient(session.id),
      this.productRepository.findById(input.productId),
    ]);

    if (!product) {
      throw new ProductNotFoundError();
    }

    if (!existingOrder) {
      return this.orderRepository.create({
        totalPrice: input.quantity * product.price.toNumber(),
        client: {
          connect: {
            id: session.id,
          },
        },
        orderProducts: {
          create: {
            quantity: input.quantity,
            unitPrice: product.price,
            subtotal: product.price.toNumber() * input.quantity,
            product: {
              connect: {
                id: input.productId,
              },
            },
          },
        },
      });
    }

    verifyAllowedUserAccess(session, existingOrder.clientId);

    return this.orderRepository.update(
      {
        id: existingOrder.id,
      },
      {
        totalPrice: {
          increment: input.quantity * product.price.toNumber(),
        },
        orderProducts: {
          create: {
            quantity: input.quantity,
            unitPrice: product.price,
            subtotal: product.price.toNumber() * input.quantity,
            product: {
              connect: {
                id: input.productId,
              },
            },
          },
        },
      },
    );
  }
}
