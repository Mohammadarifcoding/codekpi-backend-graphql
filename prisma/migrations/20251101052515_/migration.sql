/*
  Warnings:

  - You are about to drop the column `pictureId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `workshopId` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admikn');

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "pictureId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "workshopId",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user';
