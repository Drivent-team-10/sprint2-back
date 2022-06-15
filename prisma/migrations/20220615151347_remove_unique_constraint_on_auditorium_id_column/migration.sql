/*
  Warnings:

  - You are about to drop the column `eventId` on the `activities` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[event_id]` on the table `activities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `event_id` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_eventId_fkey";

-- DropIndex
DROP INDEX "activities_eventId_key";

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "eventId",
ADD COLUMN     "event_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "activities_event_id_key" ON "activities"("event_id");

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
