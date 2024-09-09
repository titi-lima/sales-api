import { type IDeleteUserWhereDTO } from '@DTOs';
import { UserNotFoundError } from 'src/errors';
import type { IUserRepository } from 'src/infra/data-access/interfaces/UserRepository';

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(where: IDeleteUserWhereDTO) {
    const isExistingUser = await this.userRepository.findById(where.id);

    if (!isExistingUser) {
      throw new UserNotFoundError();
    }

    await this.userRepository.delete({
      id: where.id,
    });
  }
}
