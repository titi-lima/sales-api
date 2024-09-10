import { HttpException } from '../shared/HttpException';

export class OrderProductNotFoundError extends HttpException {
  constructor(message: string = 'Product not found in order.') {
    super(404, message);
  }
}
