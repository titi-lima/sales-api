import { FailedPaymentError } from 'src/errors';
import { shouldAuthorizePayment } from 'src/shared/utils/shouldAuthorizePayment';

export class PaymentService {
  async createOrder() {
    if (!shouldAuthorizePayment()) {
      throw new FailedPaymentError();
    }
    return true;
  }
}
