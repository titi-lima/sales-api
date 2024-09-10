import { prisma } from '@database';
import { type PrismaClient } from '@prisma/client';
import { type IOrderRepository } from '../../interfaces/OrderRepository';
import { type IOrderCreate } from '../interfaces/order/OrderCreate';
import { type IOrderDelete } from '../interfaces/order/OrderDelete';
import { type IOrderFindAll } from '../interfaces/order/OrderFindAll';
import { type IOrderFindById } from '../interfaces/order/OrderFindById';
import { type IOrderUpdate } from '../interfaces/order/OrderUpdate';
import { type IOrderFindByClient } from '../interfaces/order/OrderFindByClient';

export class PrismaOrderRepository implements IOrderRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  create(input: IOrderCreate.Input): Promise<IOrderCreate.Output> {
    return this.prisma.order.create({
      data: input,
      include: {
        orderProducts: true,
      },
    });
  }

  update(
    where: IOrderUpdate.Where,
    input: IOrderUpdate.Input,
  ): Promise<IOrderUpdate.Output> {
    return this.prisma.order.update({
      data: input,
      where,
      include: {
        orderProducts: true,
      },
    });
  }

  async delete(input: IOrderDelete.Input): Promise<IOrderDelete.Output> {
    await this.prisma.order.delete({
      where: {
        id: input.id,
      },
    });
  }

  findById(id: IOrderFindById.Input): Promise<IOrderFindById.Output | null> {
    return this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderProducts: true,
      },
    });
  }

  findAll(
    input: IOrderFindAll.Input,
    { limit, offset }: IOrderFindAll.Options,
  ): Promise<IOrderFindAll.Output[]> {
    return this.prisma.order.findMany({
      where: input,
      take: limit,
      skip: offset,
      include: {
        orderProducts: true,
      },
    });
  }

  findByClient(
    input: IOrderFindByClient.Input,
  ): Promise<IOrderFindByClient.Output | null> {
    return this.prisma.order.findFirst({
      where: {
        clientId: input,
        status: 'CART',
      },
      include: {
        orderProducts: true,
      },
    });
  }
}
