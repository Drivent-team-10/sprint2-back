import accommodationService from '@/services/accommodation-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getAccommodationData(req: Request, res: Response): Promise<void> {
  const accommodations = await accommodationService.getAccommodationData();

  res.status(httpStatus.OK).send(accommodations);
}
