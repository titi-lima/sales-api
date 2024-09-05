import type { NextFunction, Request, Response } from 'express';
import { type HttpException } from 'src/errors';

export const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!error) return next();

  res.locals.status = error.status || 500;
  res.locals.message = error.message || 'Algo deu errado.';

  return next();
};
