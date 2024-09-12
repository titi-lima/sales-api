import {
  type IUpdateSalesReportDTO,
  type IUpdateSalesReportWhereDTO,
} from '@DTOs';
import { json2csv } from 'json-2-csv';
import { SalesReportNotFoundError } from 'src/errors';
import type { ISalesReportRepository } from 'src/infra/data-access/interfaces/SalesReportRepository';
import type { FileService } from 'src/infra/external/s3';

export class UpdateSalesReportUseCase {
  constructor(
    private salesReportRepository: ISalesReportRepository,
    private fileService: FileService,
  ) {
    this.salesReportRepository = salesReportRepository;
    this.fileService = fileService;
  }

  async execute({
    input,
    where,
  }: {
    input: IUpdateSalesReportDTO;
    where: IUpdateSalesReportWhereDTO;
  }) {
    const existingSalesReport = await this.salesReportRepository.findById(
      where.id,
    );

    if (!existingSalesReport) {
      throw new SalesReportNotFoundError();
    }

    const salesReport = await this.salesReportRepository.salesByProduct({
      beginDate: input.beginDate ?? existingSalesReport.beginDate,
      endDate: input.endDate ?? existingSalesReport.endDate,
    });

    await this.fileService.uploadFile({
      Key: existingSalesReport.path,
      Body: json2csv(salesReport),
    });

    const updatedSalesReport = await this.salesReportRepository.update(where, {
      ...input,
      productsQuantity: salesReport.reduce(
        (acc, v) => acc + Number(v.total_quantity ?? 0),
        0,
      ),
      totalPrice: salesReport.reduce(
        (acc, v) => acc + Number(v.total_price ?? 0),
        0,
      ),
    });

    return updatedSalesReport;
  }
}
