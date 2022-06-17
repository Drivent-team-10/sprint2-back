import { PrismaClient } from '@prisma/client';
import { createAccommodations } from './accommodations';
import { createEvents } from './events';
import { createRooms } from './rooms';
import { createTypes } from './types';
import { createActivities, createAuditoriums } from './activities';

export const prisma = new PrismaClient();

async function main() {
  await createEvents();
  await createTypes();
  await createAccommodations();
  await createRooms();
  await createAuditoriums();
  await createActivities();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
