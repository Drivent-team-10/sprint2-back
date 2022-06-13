/*
  Warnings:

  - You are about to drop the column `accommodationId` on the `rooms` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `rooms` table. All the data in the column will be lost.
  - Added the required column `accommodation_id` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_accommodationId_fkey";

-- DropForeignKey
ALTER TABLE "rooms" DROP CONSTRAINT "rooms_typeId_fkey";

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "accommodationId",
DROP COLUMN "typeId",
ADD COLUMN     "accommodation_id" INTEGER NOT NULL,
ADD COLUMN     "type_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "accommodations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
