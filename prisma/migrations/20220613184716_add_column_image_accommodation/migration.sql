/*
  Warnings:

  - You are about to drop the column `ocupation` on the `accommodations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accommodations" DROP COLUMN "ocupation",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "occupation" INTEGER NOT NULL DEFAULT 0;
