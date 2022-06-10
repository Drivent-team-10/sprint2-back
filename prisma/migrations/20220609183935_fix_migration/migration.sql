/*
  Warnings:

  - You are about to drop the column `capacity` on the `rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "room" INTEGER;

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "capacity";

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);
