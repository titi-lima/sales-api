import { type IProductCreate } from 'src/infra/data-access/prisma/interfaces/product/ProductCreate';
import { type IProductUpdate } from '../prisma/interfaces/product/ProductUpdate';
import { type IProductDelete } from '../prisma/interfaces/product/ProductDelete';
import { type IProductFindById } from '../prisma/interfaces/product/ProductFindById';
import { type IProductFindAll } from '../prisma/interfaces/product/ProductFindAll';

export interface IProductRepository {
  create: (input: IProductCreate.Input) => Promise<IProductCreate.Output>;
  update: (
    where: IProductUpdate.Where,
    input: IProductUpdate.Input,
  ) => Promise<IProductUpdate.Output>;
  delete: (input: IProductDelete.Input) => Promise<IProductDelete.Output>;
  findById: (
    id: IProductFindById.Input,
  ) => Promise<IProductFindById.Output | null>;
  findAll: (
    input: IProductFindAll.Input,
    { limit, offset, priceOrderBy, available }: IProductFindAll.Options,
  ) => Promise<IProductFindAll.Output[]>;
}
