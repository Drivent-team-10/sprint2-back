import { prisma } from '@/config';
import { Reservation } from '@prisma/client';
import { Action } from '@/services/rooms-service';

export type ReservationInsertData = Omit<Reservation, 'id' | 'createdAt' | 'updatedAt' | 'roomId'>;

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

async function update(roomId: number, reservationId: number, action: Action) {
  switch (action) {
    case 'add':
      await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          roomId,
        },
      });
    case 'remove':
      await prisma.reservation.update({
        where: {
          id: reservationId,
        },
        data: {
          roomId: null,
        },
      });
  }
}

async function findByEnrollmentId(id: number): Promise<Reservation> {
  return prisma.reservation.findUnique({ where: { enrollmentId: id } });
}

const reservationRepository = {
  createReservation,
  findById,
  update,
  findByEnrollmentId,
};

export default reservationRepository;
