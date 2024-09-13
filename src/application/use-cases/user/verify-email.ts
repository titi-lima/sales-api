import { type IUserRepository } from 'src/infra/data-access/interfaces/UserRepository';
import { type IVerifyEmailDTO } from '@DTOs';
import { UserNotFoundError } from 'src/errors';

export class VerifyEmailUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(input: IVerifyEmailDTO) {
    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new UserNotFoundError();
    }

    await this.userRepository.update(
      { id: input.id },
      {
        Client: {
          update: {
            status: 'ACTIVE',
          },
        },
      },
    );
  }
}
