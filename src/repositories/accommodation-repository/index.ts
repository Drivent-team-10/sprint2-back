import { prisma } from '@/config';
import { Accommodation, Type, Room } from '@prisma/client';

async function findMany() {
  return await prisma.accommodation.findMany();
}

async function findById(id: number) {
  return await prisma.room.findMany({
    where: {
      accommodationId: id,
    },
    include: {
      type: true,
      accommodation: true,
    },
  });
}

const accommodationRepository = {
  findMany,
  findById,
};

export default accommodationRepository;
