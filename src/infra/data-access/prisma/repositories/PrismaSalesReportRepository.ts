import { prisma } from '@database';
import { type PrismaClient } from '@prisma/client';
import { salesByProduct } from '@prisma/client/sql';
import { type ISalesReportRepository } from '../../interfaces/SalesReportRepository';
import { type ISalesReportSalesByProduct } from '../interfaces/sales-report/SalesReportSalesByProduct';
import { type ISalesReportDelete } from '../interfaces/sales-report/SalesReportDelete';
import { type ISalesReportFindAll } from '../interfaces/sales-report/SalesReportFindAll';
import { type ISalesReportFindById } from '../interfaces/sales-report/SalesReportFindById';
import { type ISalesReportUpdate } from '../interfaces/sales-report/SalesReportUpdate';
import { type ISalesReportCreate } from '../interfaces/sales-report/SalesReportCreate';

export class PrismaSalesReportRepository implements ISalesReportRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prisma;
  }

  create(input: ISalesReportCreate.Input): Promise<ISalesReportCreate.Output> {
    return this.prisma.salesReport.create({
      data: input,
    });
  }

  salesByProduct(
    input: ISalesReportSalesByProduct.Input,
  ): Promise<ISalesReportSalesByProduct.Output> {
    return this.prisma.$queryRawTyped(
      salesByProduct(input.beginDate, input.endDate),
    );
  }

  update(
    where: ISalesReportUpdate.Where,
    input: ISalesReportUpdate.Input,
  ): Promise<ISalesReportUpdate.Output> {
    return this.prisma.salesReport.update({
      data: input,
      where,
    });
  }

  async delete(
    input: ISalesReportDelete.Input,
  ): Promise<ISalesReportDelete.Output> {
    await this.prisma.salesReport.delete({
      where: {
        id: input.id,
      },
    });
  }

  findById(
    id: ISalesReportFindById.Input,
  ): Promise<ISalesReportFindById.Output | null> {
    return this.prisma.salesReport.findUnique({
      where: {
        id,
      },
    });
  }

  findAll(
    input: ISalesReportFindAll.Input,
    { limit, offset }: ISalesReportFindAll.Options,
  ): Promise<ISalesReportFindAll.Output[]> {
    return this.prisma.salesReport.findMany({
      where: input,
      take: limit,
      skip: offset,
      orderBy: {
        beginDate: 'asc',
      },
    });
  }
}
