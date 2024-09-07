import { Router } from 'express';
import UserRouter from './user';

const router = Router();

router.use('/users', UserRouter);

router.route('/').get((_, res) => {
  res.status(200).send('Up and running!');
});

export default router;
