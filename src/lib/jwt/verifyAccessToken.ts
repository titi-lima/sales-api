import jwt from 'jsonwebtoken';
import { UnauthorizedError } from 'src/errors';
import type { Session } from 'src/shared/types/Session';

export function verifyAccessToken(token: string): jwt.JwtPayload & Session {
  try {
    const verifiedToken = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string,
    ) as jwt.JwtPayload & Session;

    return verifiedToken;
  } catch (error) {
    throw new UnauthorizedError();
  }
}
