import { PrismaProductRepository } from '@prisma-repositories';
import { UpdateProductUseCase } from 'src/application/use-cases/product/update';

export const makeUpdateProductUseCase = () => {
  const productRepository = new PrismaProductRepository();
  return new UpdateProductUseCase(productRepository);
};
