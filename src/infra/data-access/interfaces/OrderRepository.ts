import { type IOrderCreate } from 'src/infra/data-access/prisma/interfaces/order/OrderCreate';
import { type IOrderUpdate } from '../prisma/interfaces/order/OrderUpdate';
import { type IOrderDelete } from '../prisma/interfaces/order/OrderDelete';
import { type IOrderFindById } from '../prisma/interfaces/order/OrderFindById';
import { type IOrderFindAll } from '../prisma/interfaces/order/OrderFindAll';
import { type IOrderFindByClient } from '../prisma/interfaces/order/OrderFindByClient';

export interface IOrderRepository {
  create: (input: IOrderCreate.Input) => Promise<IOrderCreate.Output>;
  update: (
    where: IOrderUpdate.Where,
    input: IOrderUpdate.Input,
  ) => Promise<IOrderUpdate.Output>;
  delete: (input: IOrderDelete.Input) => Promise<IOrderDelete.Output>;
  findById: (id: IOrderFindById.Input) => Promise<IOrderFindById.Output | null>;
  findAll: (
    input: IOrderFindAll.Input,
    { limit, offset }: IOrderFindAll.Options,
  ) => Promise<IOrderFindAll.Output[]>;
  findByClient: (
    input: IOrderFindByClient.Input,
  ) => Promise<IOrderFindByClient.Output | null>;
}
