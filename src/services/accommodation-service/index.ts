import accommodationRepository from '@/repositories/accommodation-repository';

async function getAccommodationData() {
  const accommodations = await accommodationRepository.getAccommodationData();

  const ac1 = {
    accommodation: {
      id: 1,
      name: accommodations.find((acc) => (acc.accommodationId === 1 ? acc.accommodation : '')).accommodation,
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

const accommodationService = {
  getAccommodationData,
};

export default accommodationService;
