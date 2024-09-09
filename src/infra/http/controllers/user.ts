import {
  CreateUserDTO,
  DeleteUserWhereDTO,
  FindAllUserWhereDTO,
  FindByIdUserWhereDTO,
  UpdateUserDTO,
  UpdateUserWhereDTO,
} from '@DTOs';
import type { NextFunction, Request, Response } from 'express';
import { makeCreateUserUseCase } from 'src/application/factories/user/create';
import { makeDeleteUserUseCase } from 'src/application/factories/user/delete';
import { makeFindAllUserUseCase } from 'src/application/factories/user/find-all';
import { makeFindByIdUserUseCase } from 'src/application/factories/user/find-by-id';
import { makeUpdateUserUseCase } from 'src/application/factories/user/update';
import { verifyAllowedUserAccess } from 'src/shared/utils/verifyAllowedUserMutation';
import { type AuthRouteResponse } from '../types/AuthResponse';

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CreateUserDTO.parseAsync(req.body);

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

  static async findAll(
    req: Request,
    res: AuthRouteResponse,
    next: NextFunction,
  ) {
    try {
      const data = FindAllUserWhereDTO.parse(req.query);

      const findAllUseCase = makeFindAllUserUseCase();

      const users = await findAllUseCase.execute(data);

      res.locals = {
        message: 'Users found.',
        status: 200,
        data: users,
        session: res.locals.session,
      };

      if (users.length === 0) {
        res.locals.status = 204;
      }

      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async findById(
    req: Request,
    res: AuthRouteResponse,
    next: NextFunction,
  ) {
    try {
      const data = FindByIdUserWhereDTO.parse(req.params);

      verifyAllowedUserAccess(res.locals.session, data.id);

      const findByIdUseCase = makeFindByIdUserUseCase();

      const user = await findByIdUseCase.execute(data);

      res.locals = {
        message: 'User found.',
        status: 200,
        data: user,
        session: res.locals.session,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async update(
    req: Request,
    res: AuthRouteResponse,
    next: NextFunction,
  ) {
    try {
      const data = await UpdateUserDTO.parseAsync(req.body);
      const where = UpdateUserWhereDTO.parse(req.params);

      verifyAllowedUserAccess(res.locals.session, where.id);

      const updateUseCase = makeUpdateUserUseCase();

      const user = await updateUseCase.execute({
        input: data,
        where,
      });

      res.locals = {
        message: 'User updated successfully.',
        status: 200,
        data: user,
        session: res.locals.session,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async delete(
    req: Request,
    res: AuthRouteResponse,
    next: NextFunction,
  ) {
    try {
      const where = DeleteUserWhereDTO.parse(req.params);

      verifyAllowedUserAccess(res.locals.session, where.id);

      const deleteUseCase = makeDeleteUserUseCase();

      await deleteUseCase.execute(where);

      res.locals = {
        message: 'User deleted successfully.',
        status: 200,
        session: res.locals.session,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}
