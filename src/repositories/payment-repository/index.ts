import { prisma } from '@/config';
import { Payment } from '@prisma/client';

export type PaymentInsertData = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

async function createPayment(paymentData: PaymentInsertData): Promise<Payment> {
  return prisma.payment.create({
    data: paymentData,
  });
}

async function findPaymentByReservationId(reservationId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where: { reservationId },
  });
}

async function findPaymentsByEventIdAndUserId(eventId: number, userId: number) {
  return prisma.payment.findMany({
    where: {
      reservation: {
        eventId,
        Enrollment: { userId },
      },
    },
    include: {
      reservation: true,
    },
  });
}

const paymentRepository = {
  createPayment,
  findPaymentByReservationId,
  findPaymentsByEventIdAndUserId,
};

export default paymentRepository;
