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
    const client =
      session.type === 'ADMIN'
        ? { id: where.clientId }
        : { user: { id: session.id } };
    return this.orderRepository.findAll(
      {
        client,
        orderedAt: {
          gte: where.orderedAtBegin,
          lte: where.orderedAtEnd,
        },
        status: where.status || {
          not: 'CART',
        },
      },
      {
        limit: where.limit,
        offset: where.offset,
      },
    );
  }
}
