import { type ICreateUserDTO } from '@DTOs';
import { UserAlreadyExistsError } from 'src/errors';
import type { IUserRepository } from 'src/infra/data-access/interfaces/UserRepository';
import { type MailService } from 'src/lib/nodemailer/mailer';

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private mailService: MailService,
  ) {
    this.userRepository = userRepository;
    this.mailService = mailService;
  }

  async execute(input: ICreateUserDTO) {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      email: input.email,
      password: input.password, // password is hashed in the DTO
      Client: {
        create: {
          status: 'INACTIVE',
          name: input.name,
          contact: input.contact,
          address: input.address,
        },
      },
    });
    const url =
      process.env.NODE_ENV === 'production'
        ? 'http://titi.ip-dynamic.org'
        : 'http://localhost:3001';

    await this.mailService.sendMail({
      subjectText: 'Welcome to Sales API',
      html: `<p>Hello ${input.name}, welcome to Sales API!</p><br/><a href="${url}/users/${user.id}/verify-email">Click here to verify your email</a>`,
      userEmail: user.email,
    });

    return user;
  }
}
