import { type ICreateSalesReportDTO } from '@DTOs';
import { type ISalesReportRepository } from 'src/infra/data-access/interfaces/SalesReportRepository';
import { Decimal } from '@prisma/client/runtime/library';
import { CreateSalesReportUseCase } from './create';

describe('CreateSalesReportUseCase', () => {
  let createSalesReportUseCase: CreateSalesReportUseCase;
  let salesReportRepository: jest.Mocked<ISalesReportRepository>;

  const mockSalesReportRepository = () => ({
    salesByProduct: jest.fn(),
    create: jest.fn().mockResolvedValue({
      id: 'sales-report-id',
      beginDate: new Date('2023-01-01'),
      endDate: new Date('2023-01-31'),
      totalPrice: new Decimal(300),
      productsQuantity: 30,
    }),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
  });

  const mockFileService = () => ({
    uploadFile: jest.fn(),
    getFile: jest.fn(),
    deleteFile: jest.fn(),
  });

  beforeEach(() => {
    salesReportRepository = mockSalesReportRepository();
    const fileService = mockFileService();
    createSalesReportUseCase = new CreateSalesReportUseCase(
      salesReportRepository,
      fileService as any,
    );
  });

  it('should create a sales report successfully', async () => {
    const input: ICreateSalesReportDTO = {
      beginDate: new Date('2023-01-01'),
      endDate: new Date('2023-01-31'),
    };

    salesReportRepository.salesByProduct.mockResolvedValue([
      {
        // @ts-ignore
        total_quantity: 10,
        total_price: new Decimal(100),
        last_ordered_at: new Date('2023-01-01'),
      },
      {
        // @ts-ignore
        total_quantity: 20,
        total_price: new Decimal(200),
        last_ordered_at: new Date('2023-01-02'),
      },
    ]);

    const result = await createSalesReportUseCase.execute(input);

    expect(salesReportRepository.salesByProduct).toHaveBeenCalledWith({
      beginDate: input.beginDate,
      endDate: input.endDate,
    });
    expect(result).toBeDefined();
  });
});
