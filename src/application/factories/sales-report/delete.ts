import { PrismaSalesReportRepository } from '@prisma-repositories';
import { DeleteSalesReportUseCase } from 'src/application/use-cases/sales-report/delete';
import { FileService } from 'src/infra/external/s3';

export const makeDeleteSalesReportUseCase = () => {
  const salesReportRepository = new PrismaSalesReportRepository();
  const fileService = new FileService();
  return new DeleteSalesReportUseCase(salesReportRepository, fileService);
};
