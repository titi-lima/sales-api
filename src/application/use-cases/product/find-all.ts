import { type IFindAllProductWhereDTO } from '@DTOs';
import type { IProductRepository } from 'src/infra/data-access/interfaces/ProductRepository';

export class FindAllProductUseCase {
  constructor(private productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  execute(where: IFindAllProductWhereDTO) {
    return this.productRepository.findAll(
      {
        name: where.name
          ? {
              contains: where.name,
            }
          : undefined,
        description: where.description
          ? {
              contains: where.description,
            }
          : undefined,
      },
      {
        limit: where.limit,
        offset: where.offset,
        priceOrderBy: where.priceOrderBy,
        available: where.available,
      },
    );
  }
}
