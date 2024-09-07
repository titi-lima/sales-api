import { type PrismaClient } from '@prisma/client';
import { prisma } from '@database';
import { IUserRepository } from '../../interfaces/UserRepository';
import { IUserCreate } from '../interfaces/user/UserCreate';
import { IUserFindByEmail } from '../interfaces/user/UserFindByEmail';

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
      select: {
        id: true,
        email: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
