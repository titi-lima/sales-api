import { type IFindByIdProductWhereDTO } from '@DTOs';
import { ProductNotFoundError } from 'src/errors';
import type { IProductRepository } from 'src/infra/data-access/interfaces/ProductRepository';

export class FindByIdProductUseCase {
  constructor(private productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(where: IFindByIdProductWhereDTO) {
    const product = await this.productRepository.findById(where.id);
    if (!product) {
      throw new ProductNotFoundError();
    }
    return product;
  }
}
