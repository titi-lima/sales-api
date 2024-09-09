import { type IUserCreate } from 'src/infra/data-access/prisma/interfaces/user/UserCreate';
import { type IUserFindByEmail } from '../prisma/interfaces/user/UserFindByEmail';
import { type IUserUpdate } from '../prisma/interfaces/user/UserUpdate';
import { type IUserDelete } from '../prisma/interfaces/user/UserDelete';
import { type IUserFindById } from '../prisma/interfaces/user/UserFindById';
import { type IUserFindAll } from '../prisma/interfaces/user/UserFindAll';

export interface IUserRepository {
  create: (input: IUserCreate.Input) => Promise<IUserCreate.Output>;
  // findByEmail needs its own implementation because it returns the password.
  findByEmail: (
    email: IUserFindByEmail.Input,
  ) => Promise<IUserFindByEmail.Output | null>;
  update: (
    where: IUserUpdate.Where,
    input: IUserUpdate.Input,
  ) => Promise<IUserUpdate.Output>;
  delete: (input: IUserDelete.Input) => Promise<IUserDelete.Output>;
  findById: (id: IUserFindById.Input) => Promise<IUserFindById.Output | null>;
  findAll: (
    input: IUserFindAll.Input,
    { limit, offset }: IUserFindAll.Options,
  ) => Promise<IUserFindAll.Output[]>;
}
