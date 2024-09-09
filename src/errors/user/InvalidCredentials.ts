import { HttpException } from '../shared/HttpException';

export class InvalidCredentialsError extends HttpException {
  constructor(message: string = 'Invalid credentials.') {
    super(401, message);
  }
}
