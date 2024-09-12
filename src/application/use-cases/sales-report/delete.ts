import { type IDeleteSalesReportWhereDTO } from '@DTOs';
import { SalesReportNotFoundError } from 'src/errors';
import type { ISalesReportRepository } from 'src/infra/data-access/interfaces/SalesReportRepository';
import { FileService } from 'src/infra/external/s3';

export class DeleteSalesReportUseCase {
  constructor(
    private salesReportRepository: ISalesReportRepository,
    private fileService: FileService,
  ) {
    this.salesReportRepository = salesReportRepository;
    this.fileService = fileService;
  }

  async execute(where: IDeleteSalesReportWhereDTO) {
    const isExistingSalesReport = await this.salesReportRepository.findById(
      where.id,
    );

    if (!isExistingSalesReport) {
      throw new SalesReportNotFoundError();
    }

    await this.fileService.deleteFile(isExistingSalesReport.path);

    await this.salesReportRepository.delete({
      id: where.id,
    });
  }
}
