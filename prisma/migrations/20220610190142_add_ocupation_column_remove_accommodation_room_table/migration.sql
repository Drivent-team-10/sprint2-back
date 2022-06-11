/*
  Warnings:

  - You are about to drop the `accommodations_rooms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "accommodations_rooms" DROP CONSTRAINT "accommodations_rooms_accommodation_id_fkey";

-- DropForeignKey
ALTER TABLE "accommodations_rooms" DROP CONSTRAINT "accommodations_rooms_room_id_fkey";

-- AlterTable
ALTER TABLE "accommodations" ADD COLUMN     "ocupation" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "accommodations_rooms";
