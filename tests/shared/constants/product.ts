import { type ICreateProductDTO } from '../../../src/DTOs/product/create';

export const MOCK_PRODUCT: ICreateProductDTO[] = [
  {
    name: 'Champions League Trophy',
    description: 'Champions League Trophy',
    price: 10,
    quantity: 10,
  },
  {
    name: 'Champions League Medal',
    description: 'Champions League Medal',
    price: 100.12,
    quantity: 10,
  },
  {
    name: 'Copa America Trophy',
    description: 'Copa America Trophy',
    price: 100,
    quantity: 0,
  },
];
