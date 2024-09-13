import { PrismaUserRepository } from '@prisma-repositories';
import { VerifyEmailUseCase } from 'src/application/use-cases/user/verify-email';

export const makeVerifyEmailUseCase = () => {
  const userRepository = new PrismaUserRepository();
  return new VerifyEmailUseCase(userRepository);
};
