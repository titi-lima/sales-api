import { PrismaUserRepository } from '@prisma-repositories';
import { FindAllUserUseCase } from 'src/application/use-cases/user/find-all';

export const makeFindAllUserUseCase = () => {
  const userRepository = new PrismaUserRepository();
  return new FindAllUserUseCase(userRepository);
};
