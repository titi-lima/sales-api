import { UnauthorizedError } from 'src/errors';
import { verifyAccessToken } from 'src/lib/jwt/verifyAccessToken';

/**
 * @description Parses auth token and returns the payload.
 * @throws {UnauthorizedError} Token is invalid, expired or not present.
 */

export const parseAuth = (authToken?: string) => {
  if (!authToken) {
    throw new UnauthorizedError('Token is not present.');
  }
  try {
    const [, token] = authToken.split(' ');

    const payload = verifyAccessToken(token);

    return payload;
  } catch (e) {
    throw new UnauthorizedError('Token is invalid or expired.');
  }
};
