import { type Response } from 'express';
import { type Session } from 'src/shared/types/Session';

export type AuthRouteResponse = Response & {
  locals: Response['locals'] & {
    session?: Session;
  };
};
