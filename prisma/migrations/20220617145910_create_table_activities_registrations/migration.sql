/*
  Warnings:

  - You are about to drop the column `occupation` on the `activities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activities" DROP COLUMN "occupation";

-- CreateTable
CREATE TABLE "activities_registrations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "reservation_id" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activities_registrations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activities_registrations" ADD CONSTRAINT "activities_registrations_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities_registrations" ADD CONSTRAINT "activities_registrations_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
