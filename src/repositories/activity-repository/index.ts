import { prisma } from '@/config';

async function findByEventId(id: number) {
  return await prisma.activity.findMany({ where: { eventId: id }, include: { auditorium: true } });
}

async function findOccupation(activityId: number) {
  return await prisma.activityRegistration.findMany({
    where: {
      activityId,
    },
    include: {
      activity: true,
    },
  });

  // await prisma.activityRegistration.groupBy({
  //   by: ['activityId'],
  //   _count: {
  //     activityId: true,
  //   },
  //   where: {
  //     activityId,
  //   },
  // });
}

const activityRepository = {
  findByEventId,
  findOccupation,
};

export default activityRepository;
