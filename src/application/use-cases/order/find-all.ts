import { type IFindAllOrderWhereDTO } from '@DTOs';
import type { IOrderRepository } from 'src/infra/data-access/interfaces/OrderRepository';
import type { Session } from 'src/shared/types/Session';

export class FindAllOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }

  execute(where: IFindAllOrderWhereDTO, session: Session) {
    // if the user is NOT an admin, we only want to show their orders.
    // otherwise, show whatever the admin has requested.
    const clientId = session.type === 'ADMIN' ? where.clientId : session.id;
    return this.orderRepository.findAll(
      {
        clientId,
        orderedAt: {
          gte: where.orderedAtBegin,
          lte: where.orderedAtEnd,
        },
        status: where.status,
      },
      {
        limit: where.limit,
        offset: where.offset,
      },
    );
  }
}
