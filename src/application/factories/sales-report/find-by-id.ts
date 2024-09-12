import { PrismaSalesReportRepository } from '@prisma-repositories';
import { FindByIdSalesReportUseCase } from 'src/application/use-cases/sales-report/find-by-id';
import { FileService } from 'src/infra/external/s3';

export const makeFindByIdSalesReportUseCase = () => {
  const salesReportRepository = new PrismaSalesReportRepository();
  const fileService = new FileService();
  return new FindByIdSalesReportUseCase(salesReportRepository, fileService);
};
