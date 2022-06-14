import { notFoundError } from '@/errors';
import accommodationRepository from '@/repositories/accommodation-repository';

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

const accommodationsService = {
  findMany,
  findById,
};

export default accommodationsService;
