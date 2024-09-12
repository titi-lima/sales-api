import { type ISalesReportCreate } from 'src/infra/data-access/prisma/interfaces/sales-report/SalesReportCreate';
import { type ISalesReportUpdate } from '../prisma/interfaces/sales-report/SalesReportUpdate';
import { type ISalesReportDelete } from '../prisma/interfaces/sales-report/SalesReportDelete';
import { type ISalesReportFindById } from '../prisma/interfaces/sales-report/SalesReportFindById';
import { type ISalesReportFindAll } from '../prisma/interfaces/sales-report/SalesReportFindAll';
import { ISalesReportSalesByProduct } from '../prisma/interfaces/sales-report/SalesReportSalesByProduct';

export interface ISalesReportRepository {
  salesByProduct: (
    input: ISalesReportSalesByProduct.Input,
  ) => Promise<ISalesReportSalesByProduct.Output>;
  update: (
    where: ISalesReportUpdate.Where,
    input: ISalesReportUpdate.Input,
  ) => Promise<ISalesReportUpdate.Output>;
  delete: (
    input: ISalesReportDelete.Input,
  ) => Promise<ISalesReportDelete.Output>;
  findById: (
    id: ISalesReportFindById.Input,
  ) => Promise<ISalesReportFindById.Output | null>;
  findAll: (
    input: ISalesReportFindAll.Input,
    { limit, offset }: ISalesReportFindAll.Options,
  ) => Promise<ISalesReportFindAll.Output[]>;
  create: (
    input: ISalesReportCreate.Input,
  ) => Promise<ISalesReportCreate.Output>;
}
