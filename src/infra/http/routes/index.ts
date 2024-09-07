import { Router } from 'express';
import UserRouter from './user';
import SessionRouter from './session';

const router = Router();

router.use('/users', UserRouter);

router.use('/sessions', SessionRouter);

router.route('/').get((_, res) => {
  res.status(200).send('Up and running!');
});

export default router;
