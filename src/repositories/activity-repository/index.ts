/* eslint-disable no-console */
import { prisma } from '@/config';

export interface InsertActivitiesUsers {
  activityId: number;
  userId: number;
}

async function findById(id: number) {
  return await prisma.activities.findUnique({ where: { id } });
}

async function findByEventId(id: number) {
  return await prisma.activities.findMany({ where: { eventId: id }, include: { auditorium: true } });
}

async function findByUserId(userId: number) {
  const activitiesIds = await prisma.activitiesUsers.findMany({ where: { userId } });
  const result = [];
  for (let i = 0; i < activitiesIds.length; i++) {
    const { activityId } = activitiesIds[i];
    const activity = await prisma.activities.findUnique({ where: { id: activityId } });
    console.log('activity: ', activity);
    result.push(activity);
  }
  return result;
}

async function enrollInActivity({ activityId, userId }: InsertActivitiesUsers) {
  return await prisma.activitiesUsers.create({ data: { activityId, userId } });
}

async function updateActivityOcupation(activityId: number) {
  const sum = await prisma.activitiesUsers.count({ where: { activityId } });
  console.log('sum: ', sum);
  return await prisma.activities.update({
    where: { id: activityId },
    data: { occupation: sum },
  });
}

const activityRepository = {
  findByEventId,
  enrollInActivity,
  updateActivityOcupation,
  findByUserId,
  findById,
};

export default activityRepository;
