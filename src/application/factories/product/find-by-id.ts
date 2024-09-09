import { PrismaProductRepository } from '@prisma-repositories';
import { FindByIdProductUseCase } from 'src/application/use-cases/product/find-by-id';

export const makeFindByIdProductUseCase = () => {
  const productRepository = new PrismaProductRepository();
  return new FindByIdProductUseCase(productRepository);
};
