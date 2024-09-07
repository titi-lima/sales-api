import { HttpException } from './shared/HttpException';

export class UnauthorizedError extends HttpException {
  constructor(message: string = 'Unauthorized.') {
    super(401, message);
  }
}
