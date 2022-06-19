import { AuthenticatedRequest } from '@/middlewares';
import { roomsService } from '@/services';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getRooms(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const accommodationId = parseInt(id);

  const rooms = await roomsService.findByAccomodationId(accommodationId);
  res.send(rooms);
}

export async function updateOccupation(req: AuthenticatedRequest, res: Response) {
  const { room, reservation } = req.params;
  const roomId = parseInt(room);
  const reservationId = parseInt(reservation);

  await roomsService.updateRoomReservation(roomId, reservationId);
  res.sendStatus(httpStatus.OK);
}
