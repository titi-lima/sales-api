import { IndirectAccessError } from 'src/errors';
import type { Session } from '../types/Session';

/**
 * @description verifies if the user is trying to modify its own data (allowed) or not (not allowed), unless admin
 * @param session - session of the user that is trying to mutate the data
 * @param userId - id of the user that is set to be mutated
 * @throws {IndirectAccessError} if the session id is not the same as the user id
 */

export const verifyAllowedUserAccess = (
  session: Session,
  userId: string | null,
) => {
  if (session.type === 'ADMIN') return;
  if (session.id !== userId) {
    throw new IndirectAccessError();
  }
};
