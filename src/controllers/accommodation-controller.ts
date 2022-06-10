import { AuthenticatedRequest } from '@/middlewares';
import accommodationsService from '@/services/accommodations-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getAccommodations(req: AuthenticatedRequest, res: Response) {
  const accommodations = await accommodationsService.findMany();
  res.send(accommodations);
}
