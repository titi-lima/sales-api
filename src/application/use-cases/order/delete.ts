import { type IDeleteOrderWhereDTO } from '@DTOs';
import { OrderNotFoundError } from 'src/errors';
import type { IOrderRepository } from 'src/infra/data-access/interfaces/OrderRepository';
import type { Session } from 'src/shared/types/Session';
import { verifyAllowedUserAccess } from 'src/shared/utils/verifyAllowedUserMutation';

export class DeleteOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(where: IDeleteOrderWhereDTO, session: Session) {
    const isExistingOrder = await this.orderRepository.findById(where.id);

    if (!isExistingOrder) {
      throw new OrderNotFoundError();
    }

    verifyAllowedUserAccess(session, isExistingOrder.id);

    await this.orderRepository.delete({
      id: where.id,
    });
  }
}
