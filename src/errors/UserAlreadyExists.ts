import { HttpException } from './shared/HttpException';

export class UserAlreadyExistsError extends HttpException {
  constructor(message: string = 'User already exists.') {
    super(409, message);
  }
}
