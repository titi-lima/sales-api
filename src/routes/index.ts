import { Router } from 'express';

const router = Router();

router.route('/').get((_, res) => {
  res.status(200).send('Up and running!');
});

export default router;
