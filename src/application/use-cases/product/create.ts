import { type ICreateProductDTO } from '@DTOs';
import type { IProductRepository } from 'src/infra/data-access/interfaces/ProductRepository';

export class CreateProductUseCase {
  constructor(private productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(input: ICreateProductDTO) {
    const product = await this.productRepository.create(input);

    return product;
  }
}
