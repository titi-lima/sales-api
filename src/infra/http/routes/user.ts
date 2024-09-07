import { Router } from 'express';
import { UserController } from '@controllers';

const UserRouter = Router();

UserRouter.post('/', UserController.create);

export default UserRouter;
