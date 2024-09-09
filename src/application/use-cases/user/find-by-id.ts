import { type IFindByIdUserWhereDTO } from '@DTOs';
import { UserNotFoundError } from 'src/errors/UserNotFound';
import type { IUserRepository } from 'src/infra/data-access/interfaces/UserRepository';

export class FindByIdUserUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(where: IFindByIdUserWhereDTO) {
    const user = await this.userRepository.findById(where.id);
    if (!user) {
      throw new UserNotFoundError();
    }
    return user;
  }
}
