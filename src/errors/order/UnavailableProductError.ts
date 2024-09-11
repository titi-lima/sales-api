import { HttpException } from '../shared/HttpException';

export class UnavailableProductError extends HttpException {
  constructor(products: string | string[]) {
    const message = Array.isArray(products)
      ? `Some products are unavailable: ${products.join(', ')}`
      : `Product ${products} is unavailable`;
    super(400, message);
  }
}
