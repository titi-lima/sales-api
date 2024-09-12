import type { ISalesReportRepository } from 'src/infra/data-access/interfaces/SalesReportRepository';
import { json2csv } from 'json-2-csv';
import { type ICreateSalesReportDTO } from '@DTOs';
import type { FileService } from '../../../infra/external/s3/index';

export class CreateSalesReportUseCase {
  constructor(
    private salesReportRepository: ISalesReportRepository,
    private fileService: FileService,
  ) {
    this.salesReportRepository = salesReportRepository;
    this.fileService = fileService;
  }

  async execute(input: ICreateSalesReportDTO) {
    const report = await this.salesReportRepository.salesByProduct({
      beginDate: input.beginDate,
      endDate: input.endDate,
    });

    const csv = json2csv(
      report.map((r) => ({
        ...r,
        total_price: r.total_price?.toNumber() ?? 0,
      })),
    );

    const path = await this.fileService.uploadFile({
      Key: `sales-report-${new Date().toISOString()}.csv`,
      Body: csv,
    });

    const salesReport = await this.salesReportRepository.create({
      ...input,
      path,
      productsQuantity: report.reduce(
        (acc, v) => acc + Number(v.total_quantity ?? 0),
        0,
      ),
      totalPrice: report.reduce(
        (acc, v) => acc + Number(v.total_price ?? 0),
        0,
      ),
    });

    return salesReport;
  }
}
