import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
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
        presentialEventValue: 25000,
      },
    });
  }

  let accommodations = await prisma.accommodation.findMany();
  if (accommodations.length < 1) {
    await prisma.accommodation.createMany({
      data: [
        {
          name: 'Driven Resort',
          capacity: 25,
        },
        {
          name: 'Driven Palace',
          capacity: 25,
        },
        {
          name: 'Driven World',
          capacity: 25,
        },
      ],
    });
    accommodations = await prisma.accommodation.findMany();
  }

  let types = await prisma.type.findMany();
  if (types.length < 1) {
    await prisma.type.createMany({
      data: [
        {
          name: 'Single',
          capacity: 1,
        },
        {
          name: 'Double',
          capacity: 2,
        },
        {
          name: 'Triple',
          capacity: 3,
        },
      ],
    });
    types = await prisma.type.findMany();
  }

  await prisma.room.deleteMany();
  let rooms = await prisma.room.findMany();
  if (rooms.length < 1) {
    for (let i = 0; i < accommodations.length; i++) {
      for (let j = 0; j < 4; j++) {
        await prisma.room.create({
          data: {
            accommodationId: i + 1,
            typeId: 1,
            number: 100 + j,
          },
        });
        await prisma.room.create({
          data: {
            accommodationId: i + 1,
            typeId: 2,
            number: 110 + j,
          },
        });
        await prisma.room.create({
          data: {
            accommodationId: i + 1,
            typeId: 2,
            number: 200 + j,
          },
        });
        await prisma.room.create({
          data: {
            accommodationId: i + 1,
            typeId: 3,
            number: 210 + j,
          },
        });
      }
    }
    rooms = await prisma.room.findMany();
  }
  let auditoriums = await prisma.auditoriums.findMany();
  if (auditoriums.length < 1) {
    await prisma.auditoriums.createMany({
      data: [{ name: 'Auditório Principal' }, { name: 'Auditório Lateral' }, { name: 'Sala de Workshop' }],
    });
    auditoriums = await prisma.auditoriums.findMany();
  }

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

  console.log({ event, accommodations, types, rooms, auditoriums, activities });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
