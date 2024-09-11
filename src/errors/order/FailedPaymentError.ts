import { HttpException } from '../shared/HttpException';

export class FailedPaymentError extends HttpException {
  constructor(message: string = 'Payment failed.') {
    super(400, message);
  }
}
