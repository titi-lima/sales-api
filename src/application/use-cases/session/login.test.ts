import { type IUserRepository } from 'src/infra/data-access/interfaces/UserRepository';
import { type ILoginDTO } from '@DTOs';
import { hashPassword } from 'src/lib/bcrypt/hash';
import { LoginUseCase } from './login';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  const mockUserRepository = () => ({
    findByEmail: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
  });

  beforeEach(() => {
    userRepository = mockUserRepository();
    loginUseCase = new LoginUseCase(userRepository);
  });

  it('should login successfully', async () => {
    const input: ILoginDTO = {
      email: 'test@example.com',
      password: '1234567890',
    };

    userRepository.findByEmail.mockResolvedValue({
      id: 'user-id',
      email: input.email,
      password: await hashPassword(input.password),
    } as any);

    const result = await loginUseCase.execute(input);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(result).toBeDefined();
  });

  it('should throw an error if the user does not exist', async () => {
    const input: ILoginDTO = {
      email: 'test@example.com',
      password: 'hashedpassword',
    };

    userRepository.findByEmail.mockResolvedValue(null);

    await expect(loginUseCase.execute(input)).rejects.toThrow(
      'Invalid credentials.',
    );
    expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(userRepository.findById).not.toHaveBeenCalled();
  });
});
