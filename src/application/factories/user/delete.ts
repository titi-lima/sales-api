import { PrismaUserRepository } from '@prisma-repositories';
import { DeleteUserUseCase } from 'src/application/use-cases/user/delete';

export const makeDeleteUserUseCase = () => {
  const userRepository = new PrismaUserRepository();
  return new DeleteUserUseCase(userRepository);
};
