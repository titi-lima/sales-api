import { PrismaProductRepository } from '@prisma-repositories';
import { CreateProductUseCase } from 'src/application/use-cases/product/create';

export const makeCreateProductUseCase = () => {
  const productRepository = new PrismaProductRepository();
  return new CreateProductUseCase(productRepository);
};
