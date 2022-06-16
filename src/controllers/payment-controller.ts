import { AuthenticatedRequest } from '@/middlewares';
import { PaymentInsertData } from '@/repositories/payment-repository';
import { paymentService } from '@/services';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function paymentsPost(req: AuthenticatedRequest, res: Response) {
  const { number, name, validThru, cvc, reservationId }: PaymentInsertData = req.body;

  const payment = await paymentService.createNewPayment({
    number,
    name,
    validThru,
    cvc,
    reservationId,
  });

  res.status(httpStatus.CREATED).json(payment);
}

export async function paymentsGet(req: AuthenticatedRequest, res: Response) {
  const { eventId } = req.params;
  const { userId } = req;

  const payments = await paymentService.findPaymentsByEventIdAndUserId(Number(eventId), userId);

  res.status(200).send(payments);
}
