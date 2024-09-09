import { Router } from 'express';
import { ProductController } from '@controllers';
import { adminAuth } from '../middlewares/adminAuth';

const ProductRouter = Router();

ProductRouter.post('/', [adminAuth], ProductController.create);

ProductRouter.patch('/:id', [adminAuth], ProductController.update);

ProductRouter.delete('/:id', [adminAuth], ProductController.delete);

ProductRouter.get('/', ProductController.findAll);

ProductRouter.get('/:id', ProductController.findById);

export default ProductRouter;
