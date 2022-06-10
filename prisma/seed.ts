import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
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
        presentialEventValue: 25000
      },
    });
  }

  let accommodations = await prisma.accommodation.findMany();
  if (!accommodations) {
      await prisma.accommodation.createMany({
      data: [
        {
          name: 'Driven Resort'
        },
        {
          name: 'Driven Palace'
        }, 
        {
          name: 'Driven World'
        }
      ],
      skipDuplicates: true
    })
    accommodations = await prisma.accommodation.findMany();
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
