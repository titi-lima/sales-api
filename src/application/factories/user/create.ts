import { PrismaUserRepository } from '@prisma-repositories';
import { CreateUserUseCase } from 'src/application/use-cases/user/create';
import { MailService } from 'src/lib/nodemailer/mailer';

export const makeCreateUserUseCase = () => {
  const userRepository = new PrismaUserRepository();
  const mailService = new MailService();
  return new CreateUserUseCase(userRepository, mailService);
};
