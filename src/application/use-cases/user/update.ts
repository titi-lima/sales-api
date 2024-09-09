import type { IUpdateUserWhereDTO, IUpdateUserDTO } from '@DTOs';
import { UserEmailInUseError, UserNotFoundError } from 'src/errors';
import type { IUserRepository } from 'src/infra/data-access/interfaces/UserRepository';

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute({
    input,
    where,
  }: {
    input: IUpdateUserDTO;
    where: IUpdateUserWhereDTO;
  }) {
    const isExistingUserPromise = this.userRepository.findById(where.id);
    const isNewEmailInUsePromise = input.email
      ? this.userRepository.findByEmail(input.email)
      : Promise.resolve(null);
    const [isExistingUser, isNewEmailInUse] = await Promise.all([
      isExistingUserPromise,
      isNewEmailInUsePromise,
    ]);

    if (!isExistingUser) {
      throw new UserNotFoundError();
    }

    if (isNewEmailInUse) {
      throw new UserEmailInUseError();
    }

    const user = await this.userRepository.update(where, {
      email: input.email,
      password: input.password, // password is hashed in the DTO
      Client: {
        update: {
          name: input.name,
          contact: input.contact,
          address: input.address,
        },
      },
    });

    return user;
  }
}
