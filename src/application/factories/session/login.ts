import { LoginUseCase } from 'src/application/use-cases/session/login';
import { PrismaUserRepository } from '@prisma-repositories';

export const makeLoginUseCase = () => {
  const userRepository = new PrismaUserRepository();
  return new LoginUseCase(userRepository);
};
