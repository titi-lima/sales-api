import { Router } from 'express';
import UserRouter from './user';
import SessionRouter from './session';
import ProductRouter from './product';
import OrderRouter from './order';
import cart from './cart';

const router = Router();

router.use('/users', UserRouter);

router.use('/sessions', SessionRouter);

router.use('/products', ProductRouter);

router.use('/orders', OrderRouter);

router.use('/carts', cart);

router.route('/').get((_, res) => {
  res.status(200).send('Up and running!');
});

export default router;
