import { prisma } from './seed';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

export async function createAuditoriums() {
  let auditoriums = await prisma.auditorium.findMany();

  if (auditoriums.length < 1) {
    await prisma.auditorium.createMany({
      data: [{ name: 'Auditório Principal' }, { name: 'Auditório Lateral' }, { name: 'Sala de Workshop' }],
    });
    auditoriums = await prisma.auditorium.findMany();
  }
  return auditoriums;
}

export async function createActivities() {
  let auditoriums = await prisma.auditorium.findMany();
  let activities = await prisma.activity.findMany();

  if (activities.length < 1) {
    const { id: eventId } = await prisma.event.findFirst({ select: { id: true } });
    for (let i = 0; i < auditoriums.length; i++) {
      const dayOfEvent = dayjs().add(i, 'day').toDate();
      await prisma.activity.createMany({
        data: [
          {
            auditoriumId: auditoriums[i].id,
            name: faker.name.jobTitle(),
            vacancies: 30,
            eventId: 1,
            startsAt: dayOfEvent,
            endsAt: dayjs(dayOfEvent).add(1, 'hour').toDate(),
          },
          {
            auditoriumId: auditoriums[i].id,
            name: faker.name.jobTitle(),
            vacancies: 30,
            eventId: 1,
            startsAt: dayOfEvent,
            endsAt: dayjs(dayOfEvent).add(3, 'hour').toDate(),
          },
        ],
      });
    }
    activities = await prisma.activity.findMany();
  }
  return activities;
}
