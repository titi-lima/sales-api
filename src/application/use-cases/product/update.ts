import { type IUpdateProductDTO, type IUpdateProductWhereDTO } from '@DTOs';
import { ProductNotFoundError } from 'src/errors';
import type { IProductRepository } from 'src/infra/data-access/interfaces/ProductRepository';

export class UpdateProductUseCase {
  constructor(private productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute({
    input,
    where,
  }: {
    input: IUpdateProductDTO;
    where: IUpdateProductWhereDTO;
  }) {
    const isExistingProduct = await this.productRepository.findById(where.id);

    if (!isExistingProduct) {
      throw new ProductNotFoundError();
    }

    const product = await this.productRepository.update(where, {
      name: input.name,
      description: input.description,
      price: input.price,
      quantity: input.quantity,
    });

    return product;
  }
}
