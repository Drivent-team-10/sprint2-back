import { AuthenticatedRequest } from '@/middlewares';
import activityService from '@/services/activity-service';
import { Request, Response } from 'express';

async function find(req: Request, res: Response) {
  const { eventId } = req.params;

  const activities = await activityService.findByEventId(Number(eventId));
  res.status(200).send(activities);
}

async function enroll(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { activityId } = req.params;
  await activityService.enroll(userId, Number(activityId));

  res.sendStatus(200);
}

const activityControler = { find, enroll };

export default activityControler;
