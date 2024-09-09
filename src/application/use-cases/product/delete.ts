import { type IDeleteProductWhereDTO } from '@DTOs';
import { ProductNotFoundError } from 'src/errors';
import type { IProductRepository } from 'src/infra/data-access/interfaces/ProductRepository';

export class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(where: IDeleteProductWhereDTO) {
    const isExistingProduct = await this.productRepository.findById(where.id);

    if (!isExistingProduct) {
      throw new ProductNotFoundError();
    }

    await this.productRepository.delete({
      id: where.id,
    });
  }
}
