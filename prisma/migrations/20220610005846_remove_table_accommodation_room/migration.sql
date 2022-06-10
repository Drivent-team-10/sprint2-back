/*
  Warnings:

  - You are about to drop the `Accommodation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accommodationsRooms` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accommodationId` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accommodationsRooms" DROP CONSTRAINT "accommodationsRooms_accommodationId_fkey";

-- DropForeignKey
ALTER TABLE "accommodationsRooms" DROP CONSTRAINT "accommodationsRooms_roomId_fkey";

-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "accommodationId" INTEGER NOT NULL;

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

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "accommodations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
