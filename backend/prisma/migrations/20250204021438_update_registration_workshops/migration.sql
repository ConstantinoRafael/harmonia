/*
  Warnings:

  - You are about to drop the column `workshopId` on the `Registration` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Registration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birthday` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_workshopId_fkey";

-- DropIndex
DROP INDEX "registration_unique";

-- AlterTable
ALTER TABLE "Registration" DROP COLUMN "workshopId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "password" DROP NOT NULL;

-- CreateTable
CREATE TABLE "RegistrationWorkshop" (
    "registrationId" INTEGER NOT NULL,
    "workshopId" INTEGER NOT NULL,

    CONSTRAINT "RegistrationWorkshop_pkey" PRIMARY KEY ("registrationId","workshopId")
);

-- CreateIndex
CREATE UNIQUE INDEX "registration_unique" ON "Registration"("userId");

-- AddForeignKey
ALTER TABLE "RegistrationWorkshop" ADD CONSTRAINT "RegistrationWorkshop_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrationWorkshop" ADD CONSTRAINT "RegistrationWorkshop_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
