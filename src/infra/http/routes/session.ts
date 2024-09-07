import { Router } from 'express';
import { SessionController } from '@controllers';

const SessionRouter = Router();

SessionRouter.post('/', SessionController.login);

export default SessionRouter;
