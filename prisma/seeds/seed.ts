import { PrismaClient } from '@prisma/client';
import { createAccommodations } from './accommodations';
import { createEvents } from './events';
import { createRooms } from './rooms';
import { createTypes } from './types';

export const prisma = new PrismaClient();

async function main() {
  await createEvents();
  await createTypes();
  await createAccommodations();
  await createRooms();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
