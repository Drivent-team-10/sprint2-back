/*
  Warnings:

  - Added the required column `hosting` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "hosting" INTEGER NOT NULL;
