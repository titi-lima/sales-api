import { prisma } from '@database';
import { PrismaClient } from '@prisma/client';
import { IProductRepository } from '../../interfaces/ProductRepository';
import { IProductCreate } from '../interfaces/product/ProductCreate';
import { IProductDelete } from '../interfaces/product/ProductDelete';
import { IProductFindAll } from '../interfaces/product/ProductFindAll';
import { IProductFindById } from '../interfaces/product/ProductFindById';
import { IProductUpdate } from '../interfaces/product/ProductUpdate';

export class PrismaProductRepository implements IProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  create(input: IProductCreate.Input): Promise<IProductCreate.Output> {
    return this.prisma.product.create({
      data: input,
    });
  }

  update(
    where: IProductUpdate.Where,
    input: IProductUpdate.Input,
  ): Promise<IProductUpdate.Output> {
    return this.prisma.product.update({
      data: input,
      where,
    });
  }

  async delete(input: IProductDelete.Input): Promise<IProductDelete.Output> {
    await this.prisma.product.delete({
      where: {
        id: input.id,
      },
    });
  }

  findById(
    id: IProductFindById.Input,
  ): Promise<IProductFindById.Output | null> {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  findAll(
    input: IProductFindAll.Input,
    { limit, offset, priceOrderBy, available }: IProductFindAll.Options,
  ): Promise<IProductFindAll.Output[]> {
    return this.prisma.product.findMany({
      where: {
        ...input,
        quantity: available ? { gt: 0 } : input.quantity,
      },
      take: limit,
      skip: offset,
      orderBy: {
        price: priceOrderBy,
      },
    });
  }
}
