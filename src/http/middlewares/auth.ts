import type { Request, Response, NextFunction } from 'express';
import { parseAuth } from 'src/shared/utils/parseAuth';

export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const jwtSession = parseAuth(req.headers.authorization);

    res.locals = {
      ...res.locals,
      session: {
        id: jwtSession.id,
        type: jwtSession.type,
      },
    };

    next();
  } catch (error: unknown) {
    next(error);
  }
}
