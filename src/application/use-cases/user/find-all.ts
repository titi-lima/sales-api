import { type IFindAllUserWhereDTO } from '@DTOs';
import type { IUserRepository } from 'src/infra/data-access/interfaces/UserRepository';

export class FindAllUserUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  execute(where: IFindAllUserWhereDTO) {
    return this.userRepository.findAll(
      {
        Client: where.name
          ? {
              name: {
                contains: where.name,
              },
            }
          : undefined,
        email: where.email
          ? {
              contains: where.email,
            }
          : undefined,
        type: 'CLIENT',
      },
      {
        limit: where.limit,
        offset: where.offset,
      },
    );
  }
}
