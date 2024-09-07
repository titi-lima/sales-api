import { type IUserCreate } from 'src/infra/data-access/prisma/interfaces/user/UserCreate';
import { IUserFindByEmail } from '../prisma/interfaces/user/UserFindByEmail';

export interface IUserRepository {
  create: (input: IUserCreate.Input) => Promise<IUserCreate.Output>;
  findByEmail: (
    email: IUserFindByEmail.Input,
  ) => Promise<IUserFindByEmail.Output | null>;
}
