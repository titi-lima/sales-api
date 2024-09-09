import { PrismaUserRepository } from '@prisma-repositories';
import { FindByIdUserUseCase } from 'src/application/use-cases/user/find-by-id';

export const makeFindByIdUserUseCase = () => {
  const userRepository = new PrismaUserRepository();
  return new FindByIdUserUseCase(userRepository);
};
