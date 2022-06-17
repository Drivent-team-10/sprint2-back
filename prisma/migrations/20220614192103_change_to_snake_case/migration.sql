/*
  Warnings:

  - You are about to drop the column `validThru` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the `Accommodation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accommodationsRooms` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `valid_thru` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accommodation_id` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accommodationsRooms" DROP CONSTRAINT "accommodationsRooms_accommodationId_fkey";

-- DropForeignKey
ALTER TABLE "accommodationsRooms" DROP CONSTRAINT "accommodationsRooms_roomId_fkey";

-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_roomId_fkey";

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "validThru",
ADD COLUMN     "valid_thru" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "roomId",
ADD COLUMN     "room_id" INTEGER;

-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "accommodation_id" INTEGER NOT NULL,
ADD COLUMN     "type_id" INTEGER NOT NULL;

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
    "capacity" INTEGER NOT NULL,
    "occupation" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,

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
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "accommodations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
