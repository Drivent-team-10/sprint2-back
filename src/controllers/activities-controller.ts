import { activityService } from '@/services';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';

export async function find(req: Request, res: Response) {
  const { eventId } = req.params;

  const activities = await activityService.findByEventId(Number(eventId));
  res.status(200).send(activities);
}

export async function getOccupation(req: Request, res: Response) {
  const { activityId } = req.params;

  const occupation = await activityService.countOccupation(Number(activityId));
  res.status(200).send(occupation);
}

export async function enroll(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { activityId } = req.params;
  await activityService.enroll(userId, Number(activityId));

  res.sendStatus(200);
}
