import { AuthenticatedRequest } from '@/middlewares';
import { accommodationsService } from '@/services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getAccommodations(req: AuthenticatedRequest, res: Response) {
  const accommodations = await accommodationsService.findMany();
  res.send(accommodations);
}

export async function getAccommodationData(req: Request, res: Response): Promise<void> {
  const accommodations = await accommodationsService.getAccommodationData();

  res.status(httpStatus.OK).send(accommodations);
}

export async function getAccommodationByEnrollment(req: Request, res: Response): Promise<void> {
  const { enrollmentId } = req.params;

  const accommodation = await accommodationsService.getAccommodationByEnrollment(Number(enrollmentId));

  res.status(httpStatus.OK).send(accommodation);
}
