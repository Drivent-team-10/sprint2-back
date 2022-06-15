import activityControler from '@/controllers/activity-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const activitiesRouter = Router();

activitiesRouter.get('/:eventId', authenticateToken, activityControler.find);

export { activitiesRouter };