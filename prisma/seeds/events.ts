import { prisma } from './seed';
import dayjs from 'dayjs';

async function createEvents() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
        hosting: 35000,
        onlineEventValue: 10000,
        presentialEventValue: 25000
      },
    });
  }

  return event;
}

export {
  createEvents,
};
