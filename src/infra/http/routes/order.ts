import { Router } from 'express';
import { OrderController } from '../controllers/order';
import { auth } from '../middlewares';

const OrderRouter = Router();

OrderRouter.get('/', [auth], OrderController.findAll);

OrderRouter.put('/:id', [auth], OrderController.update);

OrderRouter.delete('/:id', [auth], OrderController.delete);

OrderRouter.get('/:id', [auth], OrderController.findById);

export default OrderRouter;
