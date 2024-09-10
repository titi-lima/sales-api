import { Router } from 'express';
import { CartController } from '../controllers/cart';
import { auth } from '../middlewares';

const cart = Router();

cart.post('/', [auth], CartController.create);

cart.get('/', [auth], CartController.findCart);

cart.patch('/:orderProductId', [auth], CartController.update);

cart.delete('/:orderProductId', [auth], CartController.delete);

export default cart;
