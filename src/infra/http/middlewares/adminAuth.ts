import type { Request, Response, NextFunction } from 'express';
import { ForbiddenError } from 'src/errors';
import { parseAuth } from 'src/shared/utils/parseAuth';

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const jwtSession = parseAuth(req.headers.authorization);

    if (jwtSession.type !== 'ADMIN') {
      throw new ForbiddenError();
    }

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
