import { prisma } from '@/config';
import { Reservation } from '@prisma/client';

export type ReservationInsertData = Omit<Reservation, 'id' | 'createdAt' | 'updatedAt' | 'room'>;

async function createReservation(reservationData: ReservationInsertData): Promise<Reservation> {
  return prisma.reservation.create({
    data: reservationData,
  });
}

async function findById(id: number): Promise<Reservation> {
  return prisma.reservation.findFirst({
    where: { id },
  });
}

async function update(roomId: number, reservationId: number) {
  await prisma.reservation.update({
    where: {
      id: reservationId,
    },
    data: {
      roomId,
    },
  });
}

const reservationRepository = {
  createReservation,
  findById,
  update,
};

export default reservationRepository;
