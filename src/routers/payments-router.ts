import { Router } from 'express';

import { authenticateToken } from '@/middlewares';
import { paymentsGet } from '@/controllers';

const paymentsRouter = Router();

paymentsRouter.get('/events/:eventId', authenticateToken, paymentsGet);

export { paymentsRouter };
