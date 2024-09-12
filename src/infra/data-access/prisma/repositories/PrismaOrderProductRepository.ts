import { prisma } from '@database';
import { type PrismaClient } from '@prisma/client';
import { type IOrderProductRepository } from '../../interfaces/OrderProductRepository';
import { type IOrderProductDelete } from '../interfaces/order-product/OrderProductDelete';
import { type IOrderProductUpdate } from '../interfaces/order-product/OrderProductUpdate';
import { type IOrderProductCreate } from '../interfaces/order-product/OrderProductCreate';
import { type IOrderProductFindById } from '../interfaces/order-product/OrderProductFindById';
import { type IOrderProductFindAll } from '../interfaces/order-product/OrderProductFindAll';

export class PrismaOrderProductRepository implements IOrderProductRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  update(
    where: IOrderProductUpdate.Where,
    input: IOrderProductUpdate.Input,
  ): Promise<IOrderProductUpdate.Output> {
    return this.prisma.orderProduct.update({
      data: input,
      where,
    });
  }

  async delete(
    input: IOrderProductDelete.Input,
  ): Promise<IOrderProductDelete.Output> {
    await this.prisma.orderProduct.delete({
      where: {
        id: input.id,
      },
    });
  }

  create(
    input: IOrderProductCreate.Input,
  ): Promise<IOrderProductCreate.Output> {
    return this.prisma.orderProduct.create({
      data: input,
    });
  }

  findById(
    id: IOrderProductFindById.Input,
  ): Promise<IOrderProductFindById.Output | null> {
    return this.prisma.orderProduct.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
        order: {
          include: {
            client: true,
          },
        },
      },
    });
  }

  findAll(
    input: IOrderProductFindAll.Input,
  ): Promise<IOrderProductFindAll.Output> {
    return this.prisma.orderProduct.findMany({
      where: input,
    });
  }
}
