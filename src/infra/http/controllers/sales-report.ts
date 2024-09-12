import {
  CreateSalesReportDTO,
  DeleteSalesReportWhereDTO,
  FindAllSalesReportWhereDTO,
  FindByIdSalesReportWhereDTO,
  UpdateSalesReportDTO,
  UpdateSalesReportWhereDTO,
} from '@DTOs';
import type { NextFunction, Request } from 'express';
import { makeCreateSalesReportUseCase } from 'src/application/factories/sales-report/create';
import { makeDeleteSalesReportUseCase } from 'src/application/factories/sales-report/delete';
import { makeFindAllSalesReportUseCase } from 'src/application/factories/sales-report/find-all';
import { makeFindByIdSalesReportUseCase } from 'src/application/factories/sales-report/find-by-id';
import { makeUpdateSalesReportUseCase } from 'src/application/factories/sales-report/update';
import { type AuthRouteResponse } from '../types/AuthResponse';

export class SalesReportController {
  static async create(
    req: Request,
    res: AuthRouteResponse,
    next: NextFunction,
  ) {
    try {
      const data = await CreateSalesReportDTO.parseAsync(req.body);

      const createUseCase = makeCreateSalesReportUseCase();

      const salesReport = await createUseCase.execute(data);

      res.locals = {
        message: 'Sales report created successfully.',
        status: 201,
        data: salesReport,
        session: res.locals.session,
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
      const data = FindAllSalesReportWhereDTO.parse(req.query);

      const findAllUseCase = makeFindAllSalesReportUseCase();

      const salesReports = await findAllUseCase.execute(data);

      res.locals = {
        message: 'Sales reports found.',
        status: 200,
        data: salesReports,
        session: res.locals.session,
      };

      if (salesReports.length === 0) {
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
      const data = FindByIdSalesReportWhereDTO.parse(req.params);

      const findByIdUseCase = makeFindByIdSalesReportUseCase();

      const salesReport = await findByIdUseCase.execute(data);

      res.locals = {
        message: 'Sales report found.',
        status: 200,
        data: salesReport,
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
      const data = await UpdateSalesReportDTO.parseAsync(req.body);
      const where = UpdateSalesReportWhereDTO.parse(req.params);

      const updateUseCase = makeUpdateSalesReportUseCase();

      const salesReport = await updateUseCase.execute({
        input: data,
        where,
      });

      res.locals = {
        message: 'Sales report updated successfully.',
        status: 200,
        data: salesReport,
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
      const where = DeleteSalesReportWhereDTO.parse(req.params);

      const deleteUseCase = makeDeleteSalesReportUseCase();

      await deleteUseCase.execute(where);

      res.locals = {
        message: 'Sales report deleted successfully.',
        status: 200,
        session: res.locals.session,
      };

      return next();
    } catch (error) {
      return next(error);
    }
  }
}
