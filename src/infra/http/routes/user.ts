import { Router } from 'express';
import { UserController } from '@controllers';

const UserRouter = Router();

UserRouter.route('/create').post(UserController.create);

export default UserRouter;
