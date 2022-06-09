import { Router } from 'express';

import { authenticateToken, validateBody } from '@/middlewares';
import { paymentsPost, reservationsPost } from '@/controllers';
import { createPaymentSchema, createReservationSchema } from '@/schemas';

const reservationsRouter = Router();

reservationsRouter.post('/', authenticateToken, validateBody(createReservationSchema), reservationsPost);
reservationsRouter.post('/:id/payment', authenticateToken, validateBody(createPaymentSchema), paymentsPost);
export { reservationsRouter };
