import { Router } from 'express';
import { UserController } from '@controllers';
import { auth } from '../middlewares';
import { adminAuth } from '../middlewares/adminAuth';

const UserRouter = Router();

UserRouter.post('/', UserController.create);
UserRouter.get('/', [adminAuth], UserController.findAll);
UserRouter.get('/:id', [auth], UserController.findById);
UserRouter.patch('/:id', [auth], UserController.update);
UserRouter.delete('/:id', [auth], UserController.delete);

export default UserRouter;
