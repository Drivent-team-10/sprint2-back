import { notFoundError, forbiddenError } from '@/errors';
import roomRepository from '@/repositories/room-repository';
import reservationRepository from '@/repositories/reservation-repository';

export type Action = 'add' | 'remove';

async function findByAccomodationId(reservationId: number) {
  const rooms = await roomRepository.findByAccomodationId(reservationId);
  return rooms;
}

async function updateRoomReservation(roomId: number, reservationId: number) {
  const room = await roomRepository.findById(roomId);
  const reservation = await reservationRepository.findById(reservationId);
  if (!room || !reservation) throw notFoundError();

  if (reservation.roomId) await removeRoomReservation(reservation.roomId, reservationId);

  if ((await verifyVacancy(roomId)) < 1) {
    throw forbiddenError('This room has no vacancy');
  }

  await roomRepository.update(roomId, 'add');
  await reservationRepository.update(roomId, reservationId, 'add');
}

async function verifyVacancy(id: number) {
  const room = await roomRepository.findById(id);
  const capacity = room.type.capacity;
  const occupation = room.occupation;

  return capacity - occupation;
}

async function removeRoomReservation(roomId: number, reservationId: number) {
  await roomRepository.update(roomId, 'remove');
  await reservationRepository.update(roomId, reservationId, 'remove');
}

const roomsService = {
  findByAccomodationId,
  updateRoomReservation,
};

export default roomsService;
