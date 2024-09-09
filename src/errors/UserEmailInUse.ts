import { HttpException } from './shared/HttpException';

export class UserEmailInUseError extends HttpException {
  constructor(message: string = 'Email already in use.') {
    super(409, message);
  }
}
