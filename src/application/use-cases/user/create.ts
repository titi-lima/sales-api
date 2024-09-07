import { type ICreateUserDTO } from '@DTOs';
import { UserAlreadyExistsError } from 'src/errors/UserAlreadyExists';
import type { IUserRepository } from 'src/infra/data-access/interfaces/UserRepository';
import { hashPassword } from 'src/lib/bcrypt/hash';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(input: ICreateUserDTO) {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await hashPassword(input.password);

    const user = await this.userRepository.create({
      email: input.email,
      password: hashedPassword,
      Client: {
        create: {
          name: input.name,
          contact: input.contact,
          address: input.address,
        },
      },
    });

    return user;
  }
}
