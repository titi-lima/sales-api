import { type ICreateOrderProductDTO } from '@DTOs';
import { type IOrderProductRepository } from 'src/infra/data-access/interfaces/OrderProductRepository';
import { type IOrderRepository } from 'src/infra/data-access/interfaces/OrderRepository';
import { type IProductRepository } from 'src/infra/data-access/interfaces/ProductRepository';
import { Decimal } from '@prisma/client/runtime/library';
import { CreateOrderProductUseCase } from './create';

describe('CreateOrderProductUseCase', () => {
  let createOrderProductUseCase: CreateOrderProductUseCase;
  let orderProductRepository: jest.Mocked<IOrderProductRepository>;
  let orderRepository: jest.Mocked<IOrderRepository>;
  let productRepository: jest.Mocked<IProductRepository>;

  const mockOrderProductRepository = () => ({
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  });

  const mockOrderRepository = () => ({
    findByUser: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
  });

  const mockProductRepository = () => ({
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  });

  beforeEach(() => {
    orderProductRepository = mockOrderProductRepository();
    orderRepository = mockOrderRepository();
    productRepository = mockProductRepository();
    createOrderProductUseCase = new CreateOrderProductUseCase(
      orderProductRepository,
      orderRepository,
      productRepository,
    );
  });

  it('should create an order product successfully', async () => {
    const input: ICreateOrderProductDTO = {
      productId: 'test-product-id',
      quantity: 10,
    };
    // @ts-expect-error
    orderRepository.create.mockResolvedValue(input);
    productRepository.findById.mockResolvedValue({
      id: 'test-product-id',
      name: 'Test Product',
      description: 'Test Product Description',
      price: new Decimal(100),
      quantity: 10,
    } as any);

    const result = await createOrderProductUseCase.execute({
      input,
      session: { id: 'test-session-id', type: 'CLIENT' },
    });

    expect(orderRepository.create).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});
