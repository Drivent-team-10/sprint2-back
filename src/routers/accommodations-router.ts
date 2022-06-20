import { getAccommodationByEnrollment, getAccommodationData } from '@/controllers';
import { Router } from 'express';

const accommodationsRouter = Router();

accommodationsRouter.get('/:eventId/accommodations', getAccommodationData);
accommodationsRouter.get('/:eventId/enrollments/:enrollmentId/accommodations', getAccommodationByEnrollment);

export { accommodationsRouter };
