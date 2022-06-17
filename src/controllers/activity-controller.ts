import activityService from '@/services/activity-service';
import { Request, Response } from 'express';

async function find(req: Request, res: Response) {
  const { eventId } = req.params;

  const activities = await activityService.findByEventId(Number(eventId));
  res.status(200).send(activities);
}

async function enroll(req: Request, res: Response) {
  res.status(200).send(req.params);
}

const activityControler = { find, enroll };

export default activityControler;
