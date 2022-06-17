-- CreateTable
CREATE TABLE "activitiesUsers" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL,

    CONSTRAINT "activitiesUsers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activitiesUsers" ADD CONSTRAINT "activitiesUsers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activitiesUsers" ADD CONSTRAINT "activitiesUsers_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
