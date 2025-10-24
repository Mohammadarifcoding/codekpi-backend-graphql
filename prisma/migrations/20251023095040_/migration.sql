-- AlterTable
ALTER TABLE "User" ADD COLUMN     "workshopId" TEXT;

-- CreateTable
CREATE TABLE "_workshop_interested_users" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_workshop_interested_users_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_workshop_interested_users_B_index" ON "_workshop_interested_users"("B");

-- AddForeignKey
ALTER TABLE "_workshop_interested_users" ADD CONSTRAINT "_workshop_interested_users_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_workshop_interested_users" ADD CONSTRAINT "_workshop_interested_users_B_fkey" FOREIGN KEY ("B") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
