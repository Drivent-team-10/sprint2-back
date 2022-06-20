import { prisma } from '@/config';

export interface InsertActivitiesUsers {
  activityId: number;
  userId: number;
}

async function findById(id: number) {
  return await prisma.activity.findUnique({ where: { id } });
}

async function findByEventId(id: number) {
  return await prisma.activity.findMany({ where: { eventId: id }, include: { auditorium: true } });
}

async function findByUserId(userId: number) {
  const activitiesIds = await prisma.activitiesUsers.findMany({ where: { userId } });
  const result = [];
  for (let i = 0; i < activitiesIds.length; i++) {
    const { activityId } = activitiesIds[i];
    const activity = await prisma.activity.findUnique({ where: { id: activityId } });
    result.push(activity);
  }
  return result;
}

async function enrollInActivity({ activityId, userId }: InsertActivitiesUsers) {
  return await prisma.activitiesUsers.create({ data: { activityId, userId } });
}

async function updateActivityOcupation(activityId: number) {
  return await prisma.activity.update({
    where: { id: activityId },
    data: { vacancies: { decrement: 1 } },
  });
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
}

const activityRepository = {
  findByEventId,
  enrollInActivity,
  updateActivityOcupation,
  findByUserId,
  findById,
  findOccupation,
};

export default activityRepository;
