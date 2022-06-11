import { prisma } from '@/config';
import { PrismaPromise } from '@prisma/client';

export interface AccData {
  accommodationId: number;
  accommodation: string;
  capacityTotal: number;
  occupation: number;
  type1: number;
  type2: number;
  type3: number;
  typeId: number;
  roomNumber: number;
  roomOccupation: number;
  roomId: number;
}

async function getAccommodationData1() {
  return prisma.accommodation.findMany({});
}

async function getAccommodationData(): Promise<AccData[]> {
  const accommodations: PrismaPromise<AccData[]> = prisma.$queryRaw`
    SELECT
      accommodations.id AS "accommodationId",
      accommodations.name AS accommodation,
      accommodations.capacity AS "capacityTotal",
      accommodations.occupation AS occupation,
      rooms.type_id = CASE
          WHEN (rooms.type_id = 1) 
              then 1 
              ELSE 0
              END 
              AS type1,
      rooms.type_id = CASE
          WHEN (rooms.type_id = 2) 
              then 2 
              ELSE 0
              END
              AS type2,
      rooms.type_id = CASE
          WHEN (rooms.type_id = 3) 
              then 3
              ELSE 0
              END 
              AS type3,
      types.id AS "typeId",
      rooms.number AS "roomNumber",
      rooms.occupation AS "roomOccupation",
      rooms.id AS "roomId"
    FROM rooms
    JOIN accommodations
      ON accommodations.id = rooms.accommodation_id
    JOIN types
      ON types.id = rooms.type_id
    WHERE
      rooms.occupation = 0;
  `;

  return accommodations;
}

const accommodationRepository = {
  getAccommodationData,
};

export default accommodationRepository;
