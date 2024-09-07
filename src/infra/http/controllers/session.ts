import { LoginDTO } from '@DTOs';
import type { NextFunction, Request, Response } from 'express';
import { makeLoginUseCase } from 'src/application/factories/session/login';

export class SessionController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const data = LoginDTO.parse(req.body);

      const loginUseCase = makeLoginUseCase();

      const accessToken = await loginUseCase.execute(data);

      res.locals = {
        message: 'Login successful.',
        status: 200,
        data: accessToken,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}
