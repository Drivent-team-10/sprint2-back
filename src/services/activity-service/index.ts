import activityRepository from '@/repositories/activity-repository';
import { conflictError } from '@/errors';
import { Activities } from '@prisma/client';
import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';

async function findByEventId(id: number) {
  const response = await activityRepository.findByEventId(id);

  return response;
}

async function enroll(userId: number, activityId: number) {
  const existingActivities = await activityRepository.findByUserId(userId);
  const currentActivity = await activityRepository.findById(activityId);

  for (const activity of existingActivities) {
    if (verifyConflictingActivities(activity, currentActivity)) {
      throw conflictError('You cannot enroll in activities that occur at the same time');
    }
  }

  await activityRepository.enrollInActivity({ activityId, userId });
  await activityRepository.updateActivityOcupation(activityId);

  return;
}

function verifyConflictingActivities(activity1: Activities, activity2: Activities) {
  dayjs.extend(isBetween);
  const isConflicting = dayjs(activity1.startsAt).isBetween(activity2.startsAt, activity2.endsAt);
  return isConflicting;
}

const activityService = {
  findByEventId,
  enroll,
};

export default activityService;
