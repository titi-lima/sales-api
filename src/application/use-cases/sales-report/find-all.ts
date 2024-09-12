import { type IFindAllSalesReportWhereDTO } from '@DTOs';
import type { ISalesReportRepository } from 'src/infra/data-access/interfaces/SalesReportRepository';

export class FindAllSalesReportUseCase {
  constructor(private salesReportRepository: ISalesReportRepository) {
    this.salesReportRepository = salesReportRepository;
  }

  execute(where: IFindAllSalesReportWhereDTO) {
    return this.salesReportRepository.findAll(
      {
        beginDate: {
          gte: where.beginDate,
        },
        endDate: {
          lte: where.endDate,
        },
        totalPrice: {
          gte: where.totalPriceGreaterThan,
          lte: where.totalPriceLessThan,
        },
        productsQuantity: {
          gte: where.productsQuantityGreaterThan,
          lte: where.productsQuantityLessThan,
        },
      },
      {
        limit: where.limit,
        offset: where.offset,
      },
    );
  }
}
