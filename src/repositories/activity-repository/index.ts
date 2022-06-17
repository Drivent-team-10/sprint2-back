import { prisma } from '@/config';

async function findByEventId(id: number) {
  return await prisma.activities.findMany({ where: { eventId: id }, include: { auditorium: true } });
}

const activityRepository = { findByEventId };

export default activityRepository;
