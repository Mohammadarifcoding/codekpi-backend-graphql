/*
  Warnings:

  - You are about to drop the column `avatarId` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[avatarId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `session` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Made the column `shift` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `department` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roll` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `polytechnic` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `session` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."Profile" DROP CONSTRAINT "Profile_avatarId_fkey";

-- DropIndex
DROP INDEX "public"."Profile_avatarId_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "avatarId",
DROP COLUMN "session",
ADD COLUMN     "session" TEXT NOT NULL,
ALTER COLUMN "shift" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL,
ALTER COLUMN "department" SET NOT NULL,
ALTER COLUMN "roll" SET NOT NULL,
ALTER COLUMN "polytechnic" SET NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "session",
ADD COLUMN     "session" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarId" TEXT;

-- DropEnum
DROP TYPE "public"."Session";

-- CreateIndex
CREATE UNIQUE INDEX "User_avatarId_key" ON "User"("avatarId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;
