import { notFoundError, forbiddenError } from '@/errors';
import roomRepository from '@/repositories/room-repository';
import reservationRepository from '@/repositories/reservation-repository';

async function updateRoomReservation(roomId: number, reservationId: number) {
  const room = await roomRepository.findById(roomId);
  const reservation = await reservationRepository.findById(reservationId);
  if (!room || !reservation) throw notFoundError();

  if ((await verifyVacancy(roomId)) < 1) {
    throw forbiddenError('This room has no vacancy');
  }

  await roomRepository.update(roomId);
  await reservationRepository.update(roomId, reservationId);
}

async function verifyVacancy(id: number) {
  const room = await roomRepository.findById(id);
  const capacity = room.type.capacity;
  const occupation = room.occupation;

  return capacity - occupation;
}

const roomsService = {
  updateRoomReservation,
};

export default roomsService;
