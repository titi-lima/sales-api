import { PrismaProductRepository } from '@prisma-repositories';
import { DeleteProductUseCase } from 'src/application/use-cases/product/delete';

export const makeDeleteProductUseCase = () => {
  const productRepository = new PrismaProductRepository();
  return new DeleteProductUseCase(productRepository);
};
