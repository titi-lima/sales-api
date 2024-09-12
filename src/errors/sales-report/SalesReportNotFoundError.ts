import { HttpException } from '../shared/HttpException';

export class SalesReportNotFoundError extends HttpException {
  constructor(message: string = 'Sales report not found.') {
    super(404, message);
  }
}
