-- CreateEnum
CREATE TYPE "CommitteeRole" AS ENUM ('President', 'Vice President', 'General Secretary', 'Joint General Secretary', 'Finance Secretary', 'Office Secretary', 'Media Secretary', 'Communication Secretary', 'Publicity Secretary', 'Mentor', 'Advisor', 'Representative');

-- CreateTable
CREATE TABLE "Committee" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL DEFAULT 2025,
    "name" TEXT NOT NULL DEFAULT 'CodeKPI Committee 2025',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Committee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommitteeMember" (
    "id" TEXT NOT NULL,
    "committeeId" TEXT NOT NULL,
    "role" "CommitteeRole" NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "department" "Department",
    "session" TEXT,
    "speciality" TEXT NOT NULL,
    "memberPictureId" TEXT,
    "phone" TEXT NOT NULL,
    "positionOrder" INTEGER,
    "year" INTEGER NOT NULL DEFAULT 2025,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommitteeMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommitteeMember_memberPictureId_key" ON "CommitteeMember"("memberPictureId");

-- AddForeignKey
ALTER TABLE "CommitteeMember" ADD CONSTRAINT "CommitteeMember_committeeId_fkey" FOREIGN KEY ("committeeId") REFERENCES "Committee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommitteeMember" ADD CONSTRAINT "CommitteeMember_memberPictureId_fkey" FOREIGN KEY ("memberPictureId") REFERENCES "Picture"("id") ON DELETE SET NULL ON UPDATE CASCADE;
