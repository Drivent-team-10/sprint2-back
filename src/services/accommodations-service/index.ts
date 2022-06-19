import { notFoundError } from '@/errors';
import accommodationRepository from '@/repositories/accommodation-repository';

async function getAccommodationData() {
  const accommodations = await accommodationRepository.getAccommodationData();

  const ac1 = {
    accommodation: {
      id: 1,
      name: accommodations.find((acc) => (acc.accommodationId === 1 ? acc.accommodation : '')).accommodation,
      image: accommodations.find((acc) => (acc.accommodationId === 1 ? acc.accommodation : '')).image,
      capacityTotal: accommodations.find((acc) => (acc.accommodationId === 1 ? acc.capacityTotal : 12)).capacityTotal,
      occupation: accommodations.reduce((total, num) => {
        return total + (num.accommodationId === 1 ? num.roomOccupation : 0);
      }, 0),
    },
    type1: !!accommodations.find((acc) => (acc.accommodationId === 1 && acc.type1 ? 1 : 0)),
    type2: !!accommodations.find((acc) => (acc.accommodationId === 1 && acc.type2 ? 2 : 0)),
    type3: !!accommodations.find((acc) => (acc.accommodationId === 1 && acc.type3 ? 3 : 0)),
  };

  const ac2 = {
    accommodation: {
      id: 2,
      name: accommodations.find((acc) => (acc.accommodationId === 2 ? acc.accommodation : '')).accommodation,
      image: accommodations.find((acc) => (acc.accommodationId === 2 ? acc.accommodation : '')).image,
      capacityTotal: accommodations.find((acc) => (acc.accommodationId === 2 ? acc.capacityTotal : 12)).capacityTotal,
      occupation: accommodations.reduce((total, num) => {
        return total + (num.accommodationId === 2 ? num.roomOccupation : 0);
      }, 0),
    },
    type1: !!accommodations.find((acc) => (acc.accommodationId === 2 && acc.type1 ? 1 : 0)),
    type2: !!accommodations.find((acc) => (acc.accommodationId === 2 && acc.type2 ? 2 : 0)),
    type3: !!accommodations.find((acc) => (acc.accommodationId === 2 && acc.type3 ? 3 : 0)),
  };

  const ac3 = {
    accommodation: {
      id: 3,
      name: accommodations.find((acc) => (acc.accommodationId === 3 ? acc.accommodation : '')).accommodation,
      image: accommodations.find((acc) => (acc.accommodationId === 3 ? acc.accommodation : '')).image,
      capacityTotal: accommodations.find((acc) => (acc.accommodationId === 3 ? acc.capacityTotal : 12)).capacityTotal,
      occupation: accommodations.reduce((total, num) => {
        return total + (num.accommodationId === 3 ? num.roomOccupation : 0);
      }, 0),
    },
    type1: !!accommodations.find((acc) => (acc.accommodationId === 3 && acc.type1 ? 1 : 0)),
    type2: !!accommodations.find((acc) => (acc.accommodationId === 3 && acc.type2 ? 2 : 0)),
    type3: !!accommodations.find((acc) => (acc.accommodationId === 3 && acc.type3 ? 3 : 0)),
  };

  const body = [ac1, ac2, ac3];

  return body;
}

async function getAccommodationByEnrollment(enrollmentId: number) {
  const accommodation = await accommodationRepository.getAccommodationByEnrollment(enrollmentId);

  return accommodation;
}

async function findMany() {
  const result = await accommodationRepository.findMany();

  const accommodations: any[] = [];

  result.forEach(async (accommodation) => {
    accommodations.push(await findById(accommodation.id));
  });

  return accommodations;
}

async function findById(id: number) {
  const accommodationRooms = await accommodationRepository.findById(id);
  if (accommodationRooms.length < 1) throw notFoundError();

  const name = accommodationRooms[0].accommodation.name;
  const types: any[] = [];
  let capacity = 0;
  let occupation = 0;

  accommodationRooms.forEach((accommodationRoom) => {
    const accommodationType = accommodationRoom.type;
    if (!types.find((type) => type === accommodationType)) {
      types.push(accommodationType);
    }

    capacity = capacity + accommodationRoom.type.capacity;
    occupation = occupation + accommodationRoom.occupation;
  });

  const vacancies = capacity - occupation;

  return {
    name,
    types,
    vacancies,
  };
}

export const accommodationsService = {
  getAccommodationData,
  getAccommodationByEnrollment,
  findMany,
  findById,
};
