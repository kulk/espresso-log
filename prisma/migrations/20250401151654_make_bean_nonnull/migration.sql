/*
  Warnings:

  - Made the column `beanId` on table `Espresso` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Espresso" DROP CONSTRAINT "Espresso_beanId_fkey";

-- AlterTable
ALTER TABLE "Espresso" ALTER COLUMN "beanId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Espresso" ADD CONSTRAINT "Espresso_beanId_fkey" FOREIGN KEY ("beanId") REFERENCES "Bean"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
