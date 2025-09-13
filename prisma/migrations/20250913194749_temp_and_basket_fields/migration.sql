-- AlterSequence
ALTER SEQUENCE "Bean_id_seq" MAXVALUE 9223372036854775807;

-- AlterTable
ALTER TABLE "Espresso" ADD COLUMN     "Basket" STRING(255);
ALTER TABLE "Espresso" ADD COLUMN     "Temperature" INT4;
