-- CreateTable
CREATE TABLE "activities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "ends_at" TIMESTAMP(3) NOT NULL,
    "vacancies" INTEGER NOT NULL,
    "occupation" INTEGER NOT NULL DEFAULT 0,
    "auditorium_id" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditoriums" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "auditoriums_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "activities_auditorium_id_key" ON "activities"("auditorium_id");

-- CreateIndex
CREATE UNIQUE INDEX "activities_eventId_key" ON "activities"("eventId");

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_auditorium_id_fkey" FOREIGN KEY ("auditorium_id") REFERENCES "auditoriums"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
