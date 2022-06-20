import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

import { find, getOccupation, enroll } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.get('/:eventId', authenticateToken, find);
activitiesRouter.post('/:eventId/enroll/:activityId', authenticateToken, enroll);
activitiesRouter.get('/:activityId/occupation', getOccupation);
activitiesRouter.get('/:eventId', authenticateToken, find);

export { activitiesRouter };
