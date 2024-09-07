import type { NextFunction, Request, Response } from 'express';
import { type HttpException } from 'src/errors';
import { ZodError } from 'zod';

export const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!error) return next();

  res.locals.status = error.status || 500;
  res.locals.message = error.message || 'Internal server error.';

  if (error instanceof ZodError) {
    res.locals.status = 400;
    res.locals.message = error.issues.map((issue) => issue.message).join(', ');
  }

  return next();
};
