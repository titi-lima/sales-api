import type {
  IUpdateOrderProductWhereDTO,
  IUpdateOrderProductDTO,
} from '@DTOs';
import { IndirectAccessError, OrderProductNotFoundError } from 'src/errors';
import type { IOrderProductRepository } from 'src/infra/data-access/interfaces/OrderProductRepository';
import type { IOrderRepository } from 'src/infra/data-access/interfaces/OrderRepository';
import type { IProductRepository } from 'src/infra/data-access/interfaces/ProductRepository';
import type { Session } from 'src/shared/types/Session';
import { verifyAllowedUserAccess } from 'src/shared/utils/verifyAllowedUserMutation';

export class UpdateOrderProductUseCase {
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
    where,
    session,
  }: {
    input: IUpdateOrderProductDTO;
    where: IUpdateOrderProductWhereDTO;
    session: Session;
  }) {
    const [existingOrderProduct, existingOrder] = await Promise.all([
      this.orderProductRepository.findById(where.orderProductId),
      this.orderRepository.findByClient(session.id),
    ]);

    if (!existingOrderProduct) {
      throw new OrderProductNotFoundError();
    }

    if (!existingOrder) {
      // if the order product exists, evidently the order exists.
      // therefore this will only run if a user is trying to access a product that does not belong to their order.
      throw new IndirectAccessError();
    }

    verifyAllowedUserAccess(session, existingOrder.clientId);

    const subtotal =
      (input.quantity ?? existingOrderProduct.quantity) *
      existingOrderProduct.product.price.toNumber();

    const order = await this.orderProductRepository.update(
      { id: where.orderProductId },
      {
        quantity: input.quantity,
        unitPrice: existingOrderProduct.product.price,
        subtotal,
        order: {
          update: {
            totalPrice: {
              decrement: existingOrderProduct.subtotal,
              increment: subtotal,
            },
          },
        },
      },
    );

    return order;
  }
}
