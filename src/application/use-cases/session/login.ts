import { type ILoginDTO } from '@DTOs';
import { InvalidCredentialsError } from 'src/errors';
import type { IUserRepository } from 'src/infra/data-access/interfaces/UserRepository';
import { comparePassword } from 'src/lib/bcrypt/compare';
import { generateAccessToken } from 'src/lib/jwt/generateAccessToken';

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(input: ILoginDTO) {
    const user = await this.userRepository.findByEmail(input.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordCorrect = await comparePassword(
      input.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new InvalidCredentialsError();
    }

    const accessToken = generateAccessToken(
      { id: user.id, type: user.type },
      '1d',
    );

    return accessToken;
  }
}
