/*
  Warnings:

  - You are about to drop the `Brend` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brend_id` to the `model` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "model" ADD COLUMN     "brend_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Brend";

-- CreateTable
CREATE TABLE "brend" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "brend_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "model" ADD CONSTRAINT "model_brend_id_fkey" FOREIGN KEY ("brend_id") REFERENCES "brend"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
