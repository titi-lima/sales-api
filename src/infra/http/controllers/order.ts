import {
  DeleteOrderWhereDTO,
  FindAllOrderWhereDTO,
  FindByIdOrderWhereDTO,
  UpdateOrderDTO,
  UpdateOrderWhereDTO,
} from '@DTOs';
import type { NextFunction, Request } from 'express';
import { makeDeleteOrderUseCase } from 'src/application/factories/order/delete';
import { makeFindAllOrderUseCase } from 'src/application/factories/order/find-all';
import { makeFindByIdOrderUseCase } from 'src/application/factories/order/find-by-id';
import { makeUpdateOrderUseCase } from 'src/application/factories/order/update';
import { type AuthRouteResponse } from '../types/AuthResponse';

export class OrderController {
  static async findAll(
    req: Request,
    res: AuthRouteResponse,
    next: NextFunction,
  ) {
    try {
      const data = FindAllOrderWhereDTO.parse(req.query);

      const findAllUseCase = makeFindAllOrderUseCase();

      const orders = await findAllUseCase.execute(data, res.locals.session);

      res.locals = {
        message: 'Orders found.',
        status: 200,
        data: orders,
        session: res.locals.session,
      };

      if (orders.length === 0) {
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
      const data = FindByIdOrderWhereDTO.parse(req.params);

      const findByIdUseCase = makeFindByIdOrderUseCase();

      const order = await findByIdUseCase.execute(data, res.locals.session);

      res.locals = {
        message: 'Order found.',
        status: 200,
        data: order,
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
      const data = await UpdateOrderDTO.parseAsync(req.body);
      const where = UpdateOrderWhereDTO.parse(req.params);

      const updateUseCase = makeUpdateOrderUseCase();

      const order = await updateUseCase.execute({
        input: data,
        where,
        session: res.locals.session,
      });

      res.locals = {
        message: 'Order updated successfully.',
        status: 200,
        data: order,
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
      const where = DeleteOrderWhereDTO.parse(req.params);

      const deleteUseCase = makeDeleteOrderUseCase();

      await deleteUseCase.execute(where, res.locals.session);

      res.locals = {
        message: 'Order deleted successfully.',
        status: 200,
        session: res.locals.session,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}
