import jwt from 'jsonwebtoken';
import type { Session } from 'src/shared/types/Session';

export function generateAccessToken(payload: Session, expiresIn: string) {
  const generatedToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn,
    },
  );

  return generatedToken;
}
