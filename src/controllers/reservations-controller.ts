import { AuthenticatedRequest } from '@/middlewares';
import { reservationService } from '@/services';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function reservationsPost(req: AuthenticatedRequest, res: Response) {
  const { type, accommodation } = req.body;
  const { userId } = req;

  const reservation = await reservationService.createNewReservation({ type, accommodation: !!accommodation, userId });
  res.status(httpStatus.CREATED).json(reservation);
}

export async function getReservation(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const reservation = await reservationService.findReservationById(Number(id));
  res.status(200).send(reservation);
}
