import { type IFindByIdSalesReportWhereDTO } from '@DTOs';
import { SalesReportNotFoundError } from 'src/errors';
import type { ISalesReportRepository } from 'src/infra/data-access/interfaces/SalesReportRepository';
import { type FileService } from 'src/infra/external/s3';

export class FindByIdSalesReportUseCase {
  constructor(
    private salesReportRepository: ISalesReportRepository,
    private fileService: FileService,
  ) {
    this.salesReportRepository = salesReportRepository;
    this.fileService = fileService;
  }

  async execute(where: IFindByIdSalesReportWhereDTO) {
    const salesReport = await this.salesReportRepository.findById(where.id);
    if (!salesReport) {
      throw new SalesReportNotFoundError();
    }
    const url = await this.fileService.getFile(salesReport.path);

    return { ...salesReport, url };
  }
}
