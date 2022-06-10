import { Router } from 'express';

import { authenticateToken, validateBody } from '@/middlewares';
import { paymentsPost, reservationsPost, getReservation } from '@/controllers';
import { createPaymentSchema, createReservationSchema } from '@/schemas';

const reservationsRouter = Router();

reservationsRouter.post('/', authenticateToken, validateBody(createReservationSchema), reservationsPost);
reservationsRouter.post('/:id/payment', authenticateToken, validateBody(createPaymentSchema), paymentsPost);
reservationsRouter.get('/:id', authenticateToken, getReservation);
export { reservationsRouter };
