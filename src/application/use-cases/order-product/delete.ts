import { type IDeleteOrderProductWhereDTO } from '@DTOs';
import { OrderProductNotFoundError } from 'src/errors';
import type { IOrderProductRepository } from 'src/infra/data-access/interfaces/OrderProductRepository';
import type { Session } from 'src/shared/types/Session';
import { verifyAllowedUserAccess } from 'src/shared/utils/verifyAllowedUserMutation';

export class DeleteOrderProductUseCase {
  constructor(private orderProductRepository: IOrderProductRepository) {
    this.orderProductRepository = orderProductRepository;
  }

  async execute(where: IDeleteOrderProductWhereDTO, session: Session) {
    const isExistingOrderProduct = await this.orderProductRepository.findById(
      where.orderProductId,
    );

    if (!isExistingOrderProduct) {
      throw new OrderProductNotFoundError();
    }

    verifyAllowedUserAccess(
      session,
      isExistingOrderProduct.order.client?.userId,
    );

    await this.orderProductRepository.delete({
      id: where.orderProductId,
    });
  }
}
