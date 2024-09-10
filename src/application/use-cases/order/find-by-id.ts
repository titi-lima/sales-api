import { type IFindByIdOrderWhereDTO } from '@DTOs';
import { OrderNotFoundError } from 'src/errors';
import type { IOrderRepository } from 'src/infra/data-access/interfaces/OrderRepository';
import type { Session } from 'src/shared/types/Session';
import { verifyAllowedUserAccess } from 'src/shared/utils/verifyAllowedUserMutation';

export class FindByIdOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(where: IFindByIdOrderWhereDTO, session: Session) {
    const order = await this.orderRepository.findById(where.id);
    if (!order) {
      throw new OrderNotFoundError();
    }

    verifyAllowedUserAccess(session, order.clientId);

    return order;
  }
}
