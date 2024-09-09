import { HttpException } from './shared/HttpException';

export class IndirectAccessError extends HttpException {
  constructor(message: string = "You can not access another user's data.") {
    super(403, message);
  }
}
