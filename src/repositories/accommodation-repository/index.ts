import { prisma } from '@/config';
import { Accommodation, PrismaPromise, Reservation, Room } from '@prisma/client';

export interface AccData {
  accommodationId: number;
  accommodation: string;
  capacityTotal: number;
  image: string;
  occupation: number;
  type1: number;
  type2: number;
  type3: number;
  typeId: number;
  roomNumber: number;
  roomOccupation: number;
  roomId: number;
}

export interface RoomSelected {
  id: number;
  number: number;
  occupation: number;
  accommodationId: number;
  typeId: number;
  createdAt: Date;
  updatedAt: Date;
  reservation: Reservation[];
  accommodation: Accommodation;
}

async function findMany() {
  return await prisma.accommodation.findMany();
}

async function findById(id: number) {
  return await prisma.room.findMany({
    where: {
      accommodationId: id,
    },
    include: {
      type: true,
      accommodation: true,
    },
  });
}

async function getAccommodationData(): Promise<AccData[]> {
  const accommodations: PrismaPromise<AccData[]> = prisma.$queryRaw`
    SELECT
      accommodations.id AS "accommodationId",
      accommodations.name AS accommodation,
      accommodations.capacity AS "capacityTotal",
      accommodations.occupation AS occupation,
      accommodations.image AS image,
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
      ON types.id = rooms.type_id;
  `;

  return accommodations;
}

async function getAccommodationByEnrollment(enrollmentId: number): Promise<RoomSelected> {
  return prisma.room.findFirst({
    include: {
      reservation: {
        where: {
          enrollmentId,
        },
      },
      type: true,
      accommodation: true,
    },
  });
}

const accommodationRepository = {
  findMany,
  findById,
  getAccommodationData,
  getAccommodationByEnrollment,
};

export default accommodationRepository;
