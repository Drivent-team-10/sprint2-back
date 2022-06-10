import { prisma } from '@/config';
import { Accommodation, Type, Room } from '@prisma/client';

async function findByAccomodationId(accommodationId: number) {
  return await prisma.room.findMany({
    where: {
      accommodationId,
    },
  });
}

async function findById(id: number) {
  return await prisma.room.findUnique({
    where: {
      id,
    },
    include: {
      type: true,
    },
  });
}

async function update(id: number) {
  await prisma.room.update({
    where: {
      id,
    },
    data: {
      occupation: { increment: 1 },
    },
  });
}

const roomRepository = {
  findByAccomodationId,
  findById,
  update,
};

export default roomRepository;
