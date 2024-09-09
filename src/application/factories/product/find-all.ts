import { PrismaProductRepository } from '@prisma-repositories';
import { FindAllProductUseCase } from 'src/application/use-cases/product/find-all';

export const makeFindAllProductUseCase = () => {
  const productRepository = new PrismaProductRepository();
  return new FindAllProductUseCase(productRepository);
};
