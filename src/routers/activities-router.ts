import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

import { find, getOccupation } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.get('/:activityId/occupation', getOccupation);
activitiesRouter.get('/:eventId', authenticateToken, find);

export { activitiesRouter };
