import { HttpException } from '../shared/HttpException';

export class ForbiddenError extends HttpException {
  constructor(message: string = 'Forbidden.') {
    super(403, message);
  }
}
