import { PrismaSalesReportRepository } from '@prisma-repositories';
import { CreateSalesReportUseCase } from 'src/application/use-cases/sales-report/create';
import { FileService } from 'src/infra/external/s3';

export const makeCreateSalesReportUseCase = () => {
  const salesReportRepository = new PrismaSalesReportRepository();
  const fileService = new FileService();

  return new CreateSalesReportUseCase(salesReportRepository, fileService);
};
