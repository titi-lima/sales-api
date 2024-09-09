import { HttpException } from '../shared/HttpException';

export class UserNotFoundError extends HttpException {
  constructor(message: string = 'User not found.') {
    super(404, message);
  }
}
