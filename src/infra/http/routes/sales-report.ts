import { Router } from 'express';
import { SalesReportController } from '../controllers/sales-report';
import { adminAuth } from '../middlewares/adminAuth';

const SalesReportRouter = Router();

SalesReportRouter.post('/', [adminAuth], SalesReportController.create);

SalesReportRouter.get('/', [adminAuth], SalesReportController.findAll);

SalesReportRouter.get('/:id', [adminAuth], SalesReportController.findById);

SalesReportRouter.patch('/:id', [adminAuth], SalesReportController.update);

SalesReportRouter.delete('/:id', [adminAuth], SalesReportController.delete);

export default SalesReportRouter;
