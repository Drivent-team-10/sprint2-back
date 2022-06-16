import { Router } from 'express';
import { getAccommodationByEnrollment, getAccommodationData } from '@/controllers/accommodation-controller';

const accommodationsRouter = Router();

accommodationsRouter.get('/:eventId/accommodations', getAccommodationData);
accommodationsRouter.get('/:eventId/enrollments/:enrollmentId/accommodations', getAccommodationByEnrollment);

export { accommodationsRouter };
