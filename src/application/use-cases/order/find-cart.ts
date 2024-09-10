import { OrderNotFoundError } from 'src/errors';
import type { IOrderRepository } from 'src/infra/data-access/interfaces/OrderRepository';
import type { Session } from 'src/shared/types/Session';
import { verifyAllowedUserAccess } from 'src/shared/utils/verifyAllowedUserMutation';

export class FindCartUseCase {
  constructor(private orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(session: Session) {
    const order = await this.orderRepository.findByClient(session.id);
    if (!order) {
      throw new OrderNotFoundError();
    }

    verifyAllowedUserAccess(session, order.clientId);

    return order;
  }
}
