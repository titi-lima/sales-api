import {
  CreateProductDTO,
  DeleteProductWhereDTO,
  FindAllProductWhereDTO,
  FindByIdProductWhereDTO,
  UpdateProductDTO,
  UpdateProductWhereDTO,
} from '@DTOs';
import type { NextFunction, Request, Response } from 'express';
import { makeCreateProductUseCase } from 'src/application/factories/product/create';
import { makeDeleteProductUseCase } from 'src/application/factories/product/delete';
import { makeFindAllProductUseCase } from 'src/application/factories/product/find-all';
import { makeFindByIdProductUseCase } from 'src/application/factories/product/find-by-id';
import { makeUpdateProductUseCase } from 'src/application/factories/product/update';
import { type AuthRouteResponse } from '../types/AuthResponse';

export class ProductController {
  static async create(
    req: Request,
    res: AuthRouteResponse,
    next: NextFunction,
  ) {
    try {
      const data = await CreateProductDTO.parseAsync(req.body);

      const createUseCase = makeCreateProductUseCase();

      const product = await createUseCase.execute(data);

      res.locals = {
        message: 'Product created successfully.',
        status: 201,
        data: product,
        session: res.locals.session,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = FindAllProductWhereDTO.parse(req.query);

      const findAllUseCase = makeFindAllProductUseCase();

      const products = await findAllUseCase.execute(data);

      res.locals = {
        message: 'Products found.',
        status: 200,
        data: products,
      };

      if (products.length === 0) {
        res.locals.status = 204;
      }

      return next();
    } catch (error) {
      return next(error);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = FindByIdProductWhereDTO.parse(req.params);

      const findByIdUseCase = makeFindByIdProductUseCase();

      const product = await findByIdUseCase.execute(data);

      res.locals = {
        message: 'Product found.',
        status: 200,
        data: product,
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
      const data = await UpdateProductDTO.parseAsync(req.body);
      const where = UpdateProductWhereDTO.parse(req.params);

      const updateUseCase = makeUpdateProductUseCase();

      const product = await updateUseCase.execute({
        input: data,
        where,
      });

      res.locals = {
        message: 'Product updated successfully.',
        status: 200,
        data: product,
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
      const where = DeleteProductWhereDTO.parse(req.params);

      const deleteUseCase = makeDeleteProductUseCase();

      await deleteUseCase.execute(where);

      res.locals = {
        message: 'Product deleted successfully.',
        status: 200,
        session: res.locals.session,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}
