import { PrismaSalesReportRepository } from '@prisma-repositories';
import { FindAllSalesReportUseCase } from 'src/application/use-cases/sales-report/find-all';

export const makeFindAllSalesReportUseCase = () => {
  const salesReportRepository = new PrismaSalesReportRepository();
  return new FindAllSalesReportUseCase(salesReportRepository);
};
