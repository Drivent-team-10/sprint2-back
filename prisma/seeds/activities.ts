import { prisma } from './seed';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

export async function createAuditoriums() {
  let auditoriums = await prisma.auditoriums.findMany();

  if (auditoriums.length < 1) {
    await prisma.auditoriums.createMany({
      data: [{ name: 'Auditório Principal' }, { name: 'Auditório Lateral' }, { name: 'Sala de Workshop' }],
    });
    auditoriums = await prisma.auditoriums.findMany();
  }
  return auditoriums;
}

export async function createActivities() {
  let auditoriums = await prisma.auditoriums.findMany();

  let activities = await prisma.activities.findMany();
  if (activities.length < 1) {
    const { id: eventId } = await prisma.event.findFirst({ select: { id: true } });
    for (let i = 0; i < auditoriums.length; i++) {
      await prisma.activities.createMany({
        data: [
          {
            auditoriumId: auditoriums[i].id,
            name: faker.name.jobTitle(),
            vacancies: 30,
            occupation: 0,
            eventId,
            startsAt: dayjs().toDate(),
            endsAt: dayjs().add(21, 'days').toDate(),
          },
          {
            auditoriumId: auditoriums[i].id,
            name: faker.name.jobTitle(),
            vacancies: 30,
            occupation: 0,
            eventId,
            startsAt: dayjs().toDate(),
            endsAt: dayjs().add(21, 'days').toDate(),
          },
          {
            auditoriumId: auditoriums[i].id,
            name: faker.name.jobTitle(),
            vacancies: 30,
            occupation: 0,
            eventId,
            startsAt: dayjs().toDate(),
            endsAt: dayjs().add(21, 'days').toDate(),
          },
        ],
      });
    }
    activities = await prisma.activities.findMany();
  }
  return activities;
}
