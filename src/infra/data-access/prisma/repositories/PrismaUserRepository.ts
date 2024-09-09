import { type PrismaClient } from '@prisma/client';
import { prisma } from '@database';
import type { IUserRepository } from '../../interfaces/UserRepository';
import type { IUserCreate } from '../interfaces/user/UserCreate';
import type { IUserFindByEmail } from '../interfaces/user/UserFindByEmail';
import type { IUserUpdate } from '../interfaces/user/UserUpdate';
import type { IUserDelete } from '../interfaces/user/UserDelete';
import type { IUserFindAll } from '../interfaces/user/UserFindAll';
import type { IUserFindById } from '../interfaces/user/UserFindById';

export class PrismaUserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  create(input: IUserCreate.Input): Promise<IUserCreate.Output> {
    return this.prisma.user.create({
      data: input,
      select: {
        id: true,
        email: true,
        type: true,
        createdAt: true,
        updatedAt: true,
        // fun exercise: uncommenting the following line throws a type error
        // password: true,
      },
    });
  }

  findByEmail(
    email: IUserFindByEmail.Input,
  ): Promise<IUserFindByEmail.Output | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  update(
    where: IUserUpdate.Where,
    input: IUserUpdate.Input,
  ): Promise<IUserUpdate.Output> {
    return this.prisma.user.update({
      data: input,
      where,
      select: {
        id: true,
        email: true,
        type: true,
        createdAt: true,
        updatedAt: true,
        Client: true,
      },
    });
  }

  async delete(input: IUserDelete.Input): Promise<IUserDelete.Output> {
    await this.prisma.user.delete({
      where: {
        id: input.id,
      },
    });
  }

  findAll(
    input: IUserFindAll.Input,
    options: IUserFindAll.Options,
  ): Promise<IUserFindAll.Output[]> {
    return this.prisma.user.findMany({
      where: input,
      select: {
        id: true,
        email: true,
        type: true,
        createdAt: true,
        updatedAt: true,
        Client: true,
      },
      take: options.limit,
      skip: options.offset,
    });
  }

  findById(id: IUserFindById.Input): Promise<IUserFindById.Output | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        type: true,
        createdAt: true,
        updatedAt: true,
        Client: true,
      },
    });
  }
}
