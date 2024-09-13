import { type ICreateProductDTO } from '@DTOs';
import { type IProductRepository } from 'src/infra/data-access/interfaces/ProductRepository';
import { CreateProductUseCase } from './create';

describe('CreateProductUseCase', () => {
  let createProductUseCase: CreateProductUseCase;
  let productRepository: jest.Mocked<IProductRepository>;

  const mockProductRepository = () => ({
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findAll: jest.fn(),
  });

  beforeEach(() => {
    productRepository = mockProductRepository();
    createProductUseCase = new CreateProductUseCase(productRepository);
  });

  it('should create a product successfully', async () => {
    const input: ICreateProductDTO = {
      name: 'Test Product',
      description: 'Test Product Description',
      price: 100,
      quantity: 10,
      // @ts-expect-error
      productId: 'test-product-id',
    };
    // @ts-expect-error
    productRepository.create.mockResolvedValue(input);

    const result = await createProductUseCase.execute(input);

    expect(productRepository.create).toHaveBeenCalledWith(input);
    expect(result).toBe(input);
  });
});
