import { PrismaUserRepository } from '@prisma-repositories';
import { UpdateUserUseCase } from 'src/application/use-cases/user/update';

export const makeUpdateUserUseCase = () => {
  const userRepository = new PrismaUserRepository();
  return new UpdateUserUseCase(userRepository);
};
