import activityRepository from '@/repositories/activity-repository';

async function findByEventId(id: number) {
  const response = await activityRepository.findByEventId(id);

  return response;
}

async function countOccupation(activityId: number) {
  const activityRegistration = await activityRepository.findOccupation(activityId);

  return {
    vacancies: activityRegistration[0]?.activity.vacancies,
    occupation: activityRegistration.length,
  };
}

export const activityService = {
  findByEventId,
  countOccupation,
};
