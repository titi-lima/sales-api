import { HttpException } from '../shared/HttpException';

export class OrderNotFoundError extends HttpException {
  constructor(message: string = 'Order not found.') {
    super(404, message);
  }
}
