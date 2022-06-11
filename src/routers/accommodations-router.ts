import { Router } from 'express';
import { getAccommodationData } from '@/controllers/accommodation-controller';

const accommodationsRouter = Router();

accommodationsRouter.get('/:eventId/accommodations', getAccommodationData);

export { accommodationsRouter };
