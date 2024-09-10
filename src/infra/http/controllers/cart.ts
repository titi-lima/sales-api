import {
  CreateOrderProductDTO,
  DeleteOrderProductWhereDTO,
  UpdateOrderProductDTO,
  UpdateOrderProductWhereDTO,
} from '@DTOs';
import type { NextFunction, Request } from 'express';
import { makeDeleteOrderProductUseCase } from 'src/application/factories/order-product/delete';
import { makeUpdateOrderProductUseCase } from 'src/application/factories/order-product/update';
import { makeCreateOrderProductUseCase } from 'src/application/factories/order-product/create';
import { makeFindCartUseCase } from 'src/application/factories/order/find-cart';
import { type AuthRouteResponse } from '../types/AuthResponse';

export class CartController {
  static async create(
    req: Request,
    res: AuthRouteResponse,
    next: NextFunction,
  ) {
    try {
      const data = CreateOrderProductDTO.parse(req.body);

      const createUseCase = makeCreateOrderProductUseCase();

      const orderProduct = await createUseCase.execute({
        input: data,
        session: res.locals.session,
      });

      res.locals = {
        message: 'Product added to cart.',
        status: 201,
        data: orderProduct,
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
      const data = UpdateOrderProductDTO.parse(req.body);
      const where = UpdateOrderProductWhereDTO.parse(req.params);

      const updateUseCase = makeUpdateOrderProductUseCase();

      const orderProduct = await updateUseCase.execute({
        input: data,
        where,
        session: res.locals.session,
      });

      res.locals = {
        message: 'Cart updated.',
        status: 200,
        data: orderProduct,
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
      const where = DeleteOrderProductWhereDTO.parse(req.params);

      const deleteUseCase = makeDeleteOrderProductUseCase();

      await deleteUseCase.execute(where, res.locals.session);

      res.locals = {
        message: 'Product removed from cart.',
        status: 200,
        session: res.locals.session,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async findCart(
    _: Request,
    res: AuthRouteResponse,
    next: NextFunction,
  ) {
    try {
      const findCartUseCase = makeFindCartUseCase();

      const orderProduct = await findCartUseCase.execute(res.locals.session);

      res.locals = {
        message: 'Cart found.',
        status: 200,
        data: orderProduct,
        session: res.locals.session,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}
