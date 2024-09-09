import { HttpException } from '../shared/HttpException';

export class ProductNotFoundError extends HttpException {
  constructor(message: string = 'Product not found.') {
    super(404, message);
  }
}
