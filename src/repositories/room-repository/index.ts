import { prisma } from '@/config';
import { Action } from '@/services/rooms-service';

async function findByAccomodationId(accommodationId: number) {
  return await prisma.room.findMany({
    orderBy: [{ number: 'asc' }],
    where: {
      accommodationId,
    },
    include: {
      type: true,
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

async function update(id: number, action: Action) {
  switch (action) {
    case 'add':
      await prisma.room.update({
        where: {
          id,
        },
        data: {
          occupation: { increment: 1 },
        },
      });
      break;
    case 'remove':
      await prisma.room.update({
        where: {
          id,
        },
        data: {
          occupation: { decrement: 1 },
        },
      });
      break;
  }
}

const roomRepository = {
  findByAccomodationId,
  findById,
  update,
};

export default roomRepository;
