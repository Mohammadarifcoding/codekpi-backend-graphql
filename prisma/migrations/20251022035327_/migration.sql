-- CreateEnum
CREATE TYPE "Session" AS ENUM ('18-19', '19-20', '20-21', '21-22', '22-23', '23-24', '24-25');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('Computer Technology', 'Civil Technology', 'Electrical Technology', 'Mechanical Technology', 'Electronics Technology', 'Power Technology', 'Automobile Technology', 'RAC Technology', 'Other Technology');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "Shift" AS ENUM ('morning', 'evening');

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "bio" TEXT,
    "userId" TEXT NOT NULL,
    "session" "Session",
    "shift" "Shift",
    "gender" "Gender",
    "department" "Department",
    "phone" TEXT,
    "roll" TEXT,
    "polytechnic" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
