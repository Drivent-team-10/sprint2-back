import activityRepository from '@/repositories/activity-repository';

async function findByEventId(id: number) {
  const response = await activityRepository.findByEventId(id);

  return response;
}

const activityService = {
  findByEventId,
};

export default activityService;
