import activityService from '@/services/activity-service';
import { Request, Response } from 'express';

async function find(req: Request, res: Response) {
  const { eventId } = req.params;

  const activities = await activityService.findByEventId(Number(eventId));
  res.status(200).send(activities);
}

const activityControler = { find };

export default activityControler;
