/*
  Warnings:

  - You are about to drop the column `brend` on the `computer` table. All the data in the column will be lost.
  - Added the required column `brendId` to the `computer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "computer" DROP COLUMN "brend",
ADD COLUMN     "brendId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "computer" ADD CONSTRAINT "computer_brendId_fkey" FOREIGN KEY ("brendId") REFERENCES "brend"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
