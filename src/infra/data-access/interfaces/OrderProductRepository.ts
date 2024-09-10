import { type IOrderProductCreate } from 'src/infra/data-access/prisma/interfaces/order-product/OrderProductCreate';
import { type IOrderProductUpdate } from '../prisma/interfaces/order-product/OrderProductUpdate';
import { type IOrderProductDelete } from '../prisma/interfaces/order-product/OrderProductDelete';
import { type IOrderProductFindById } from '../prisma/interfaces/order-product/OrderProductFindById';

export interface IOrderProductRepository {
  create: (
    input: IOrderProductCreate.Input,
  ) => Promise<IOrderProductCreate.Output>;
  update: (
    where: IOrderProductUpdate.Where,
    input: IOrderProductUpdate.Input,
  ) => Promise<IOrderProductUpdate.Output>;
  delete: (
    input: IOrderProductDelete.Input,
  ) => Promise<IOrderProductDelete.Output>;
  findById: (
    id: IOrderProductFindById.Input,
  ) => Promise<IOrderProductFindById.Output | null>;
}
