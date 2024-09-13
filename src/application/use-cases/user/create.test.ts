import { UserAlreadyExistsError } from 'src/errors';
import type { IUserRepository } from 'src/infra/data-access/interfaces/UserRepository';
import { type ICreateUserDTO } from '@DTOs';
import { CreateUserUseCase } from './create';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: jest.Mocked<IUserRepository>;

  const mockUserRepository = () => ({
    findByEmail: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
  });
  const mockMailService = () => ({
    sendMail: jest.fn(),
  });

  beforeEach(() => {
    userRepository = mockUserRepository();
    createUserUseCase = new CreateUserUseCase(
      userRepository,
      mockMailService() as any,
    );
  });

  it('should create a user successfully', async () => {
    const input: ICreateUserDTO = {
      email: 'test@example.com',
      password: 'hashedpassword',
      name: 'John Doe',
      contact: '1234567890',
      address: '1234 Test St, Test City, TC',
    };

    userRepository.findByEmail.mockResolvedValue(null);
    userRepository.create.mockResolvedValue({
      id: 'user-id',
      email: input.email,
      // @ts-expect-error
      Client: {
        name: input.name,
        contact: input.contact,
        address: input.address,
      },
    });

    const result = await createUserUseCase.execute(input);

    expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(userRepository.create).toHaveBeenCalledWith({
      email: input.email,
      password: input.password,
      Client: {
        create: {
          name: input.name,
          status: 'INACTIVE',
          contact: input.contact,
          address: input.address,
        },
      },
    });
    expect(result).toEqual({
      id: 'user-id',
      email: input.email,
      Client: {
        name: input.name,
        contact: input.contact,
        address: input.address,
      },
    });
  });

  it('should throw an error if the user already exists', async () => {
    const input: ICreateUserDTO = {
      email: 'test@example.com',
      password: 'hashedpassword',
      name: 'John Doe',
      contact: '1234567890',
      address: '1234 Test St, Test City, TC',
    };

    userRepository.findByEmail.mockResolvedValue({} as any);

    await expect(createUserUseCase.execute(input)).rejects.toThrow(
      UserAlreadyExistsError,
    );
    expect(userRepository.findByEmail).toHaveBeenCalledWith(input.email);
    expect(userRepository.create).not.toHaveBeenCalled();
  });
});
