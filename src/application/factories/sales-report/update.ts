import { PrismaSalesReportRepository } from '@prisma-repositories';
import { UpdateSalesReportUseCase } from 'src/application/use-cases/sales-report/update';
import { FileService } from 'src/infra/external/s3';

export const makeUpdateSalesReportUseCase = () => {
  const salesReportRepository = new PrismaSalesReportRepository();
  const fileService = new FileService();

  return new UpdateSalesReportUseCase(salesReportRepository, fileService);
};
