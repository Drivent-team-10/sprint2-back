-- CreateTable
CREATE TABLE "Accommodation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Accommodation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rooms" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "occupation" INTEGER NOT NULL,

    CONSTRAINT "rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accommodationsRooms" (
    "id" SERIAL NOT NULL,
    "accommodationId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "accommodationsRooms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accommodationsRooms" ADD CONSTRAINT "accommodationsRooms_accommodationId_fkey" FOREIGN KEY ("accommodationId") REFERENCES "Accommodation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accommodationsRooms" ADD CONSTRAINT "accommodationsRooms_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
