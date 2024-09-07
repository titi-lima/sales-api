import { PrismaUserRepository } from '@prisma-repositories';
import { CreateUserUseCase } from 'src/application/use-cases/user/create';

export const makeCreateUserUseCase = () => {
  const userRepository = new PrismaUserRepository();
  return new CreateUserUseCase(userRepository);
};
