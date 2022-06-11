import { AuthenticatedRequest } from '@/middlewares';
import accommodationsService from '@/services/accommodations-service';
import accommodationService from '@/services/accommodation-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getAccommodations(req: AuthenticatedRequest, res: Response) {
  const accommodations = await accommodationsService.findMany();
  res.send(accommodations);
}

export async function getAccommodationData(req: Request, res: Response): Promise<void> {
  const accommodations = await accommodationService.getAccommodationData();

  res.status(httpStatus.OK).send(accommodations);
}