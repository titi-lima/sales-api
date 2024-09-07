import type { Request, Response } from 'express';

export const requestHandler = (req: Request, res: Response) => {
  if (!res.locals.status) {
    res.status(404).json({
      message: 'Rota não encontrada.',
    });
    return;
  }
  res
    .status(res.locals.status)
    .json({ data: res.locals.data, message: res.locals.message });
};
