import { CreateUserDTO } from '@DTOs';
import type { NextFunction, Request, Response } from 'express';
import { makeCreateUserUseCase } from 'src/application/factories/user/create';

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = CreateUserDTO.parse(req.body);

      const createUseCase = makeCreateUserUseCase();

      const user = await createUseCase.execute(data);

      res.locals = {
        message: 'User created successfully.',
        status: 201,
        data: user,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}
