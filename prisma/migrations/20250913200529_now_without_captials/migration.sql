/*
  Warnings:

  - You are about to drop the column `Basket` on the `Espresso` table. All the data in the column will be lost.
  - You are about to drop the column `Temperature` on the `Espresso` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Espresso" DROP COLUMN "Basket";
ALTER TABLE "Espresso" DROP COLUMN "Temperature";
ALTER TABLE "Espresso" ADD COLUMN     "basket" STRING(255);
ALTER TABLE "Espresso" ADD COLUMN     "temperature" INT4;
