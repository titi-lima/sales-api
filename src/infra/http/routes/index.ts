import { Router } from 'express';
import UserRouter from './user';
import SessionRouter from './session';
import ProductRouter from './product';
import OrderRouter from './order';
import cart from './cart';
import SalesReportRouter from './sales-report';

const router = Router();

router.use('/users', UserRouter);

router.use('/sessions', SessionRouter);

router.use('/products', ProductRouter);

router.use('/orders', OrderRouter);

router.use('/carts', cart);

router.use('/sales-reports', SalesReportRouter);

router.route('/').get((_, res) => {
  res.status(200).send('Up and running!');
});

export default router;
