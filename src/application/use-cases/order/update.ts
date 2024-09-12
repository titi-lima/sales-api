import { type IUpdateOrderDTO, type IUpdateOrderWhereDTO } from '@DTOs';
import { OrderNotFoundError, UnavailableProductError } from 'src/errors';
import type { IOrderRepository } from 'src/infra/data-access/interfaces/OrderRepository';
import type { IProductRepository } from 'src/infra/data-access/interfaces/ProductRepository';
import type { IOrderFindById } from 'src/infra/data-access/prisma/interfaces/order/OrderFindById';
import type { IProductUpdate } from 'src/infra/data-access/prisma/interfaces/product/ProductUpdate';
import type { PaymentService } from 'src/infra/external/payment';
import type { Session } from 'src/shared/types/Session';
import { verifyAllowedUserAccess } from 'src/shared/utils/verifyAllowedUserMutation';

export class UpdateOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
    private paymentService: PaymentService,
  ) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.paymentService = paymentService;
  }

  private getUnavailableProducts(order: IProductUpdate.Output[]) {
    return order.filter((product) => product.quantity < 0);
  }

  private decrementQuantity(order: IOrderFindById.Output) {
    return Promise.all(
      order.orderProducts?.map(async (orderProduct) =>
        this.productRepository.update(
          { id: orderProduct.productId },
          {
            quantity: {
              decrement: orderProduct.quantity,
            },
          },
        ),
      ) ?? [],
    );
  }

  private rollbackQuantity(order: IOrderFindById.Output) {
    return Promise.all(
      order.orderProducts?.map(async (orderProduct) =>
        this.productRepository.update(
          { id: orderProduct.productId },
          {
            quantity: {
              increment: orderProduct.quantity,
            },
          },
        ),
      ) ?? [],
    );
  }

  /**
   * handling the confirmation is very tricky in terms of race conditions.
   * in order to make sure that we actually have the product in the database,
   * we need to atomically update the quantity and afterwards check availability.
   * checking beforehand would be a mistake,
   * as the product could be sold in the miliseconds after the check and before the update.
   */
  private async handleConfirmation(order: IOrderFindById.Output) {
    const products = await this.decrementQuantity(order);

    const unavailableProducts = this.getUnavailableProducts(products);

    if (unavailableProducts.length > 0) {
      await this.rollbackQuantity(order);
      throw new UnavailableProductError(unavailableProducts.map((p) => p.name));
    }

    return this.paymentService.createOrder().catch(async (e) => {
      // if the payment fails, we need to rollback the quantity
      await this.rollbackQuantity(order);
      throw e;
    });
  }

  async execute({
    input,
    where,
    session,
  }: {
    input: IUpdateOrderDTO;
    where: IUpdateOrderWhereDTO;
    session: Session;
  }) {
    const isExistingOrder = await this.orderRepository.findById(where.id);

    if (!isExistingOrder) {
      throw new OrderNotFoundError();
    }

    verifyAllowedUserAccess(session, isExistingOrder.client?.userId);

    // cart -> received is the signal that confirms the order
    const shouldCheckout =
      isExistingOrder.status === 'CART' && input.status === 'RECEIVED';

    if (shouldCheckout) {
      await this.handleConfirmation(isExistingOrder);
    }

    const order = await this.orderRepository.update(where, {
      ...input,
      orderedAt: shouldCheckout ? new Date() : undefined,
    });

    return order;
  }
}
