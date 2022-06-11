/*
  Warnings:

  - You are about to drop the `Accommodation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accommodationsRooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "accommodationsRooms" DROP CONSTRAINT "accommodationsRooms_accommodationId_fkey";

-- DropForeignKey
ALTER TABLE "accommodationsRooms" DROP CONSTRAINT "accommodationsRooms_roomId_fkey";

-- DropTable
DROP TABLE "Accommodation";

-- DropTable
DROP TABLE "Type";

-- DropTable
DROP TABLE "accommodationsRooms";

-- CreateTable
CREATE TABLE "accommodations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "accommodations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accommodations_rooms" (
    "id" SERIAL NOT NULL,
    "accommodation_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,

    CONSTRAINT "accommodations_rooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accommodations_rooms" ADD CONSTRAINT "accommodations_rooms_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "accommodations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodations_rooms" ADD CONSTRAINT "accommodations_rooms_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
