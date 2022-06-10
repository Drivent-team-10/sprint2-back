import { AuthenticatedRequest } from '@/middlewares';
import roomsService from '@/services/rooms-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function updateOccupation(req: AuthenticatedRequest, res: Response) {
  const { reservationId } = req.body;
  const { id } = req.params;
  const roomId = parseInt(id);

  await roomsService.updateRoomReservation(roomId, reservationId);
  res.sendStatus(httpStatus.OK);
}
