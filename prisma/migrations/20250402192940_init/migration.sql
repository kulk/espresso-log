-- CreateTable
CREATE TABLE "Espresso" (
    "id" SERIAL NOT NULL,
    "grindSize" DECIMAL(10,2) NOT NULL,
    "doseGrams" DECIMAL(10,2) NOT NULL,
    "durationSeconds" INTEGER NOT NULL,
    "extractionGrams" DECIMAL(10,2) NOT NULL,
    "stopTimeSeconds" INTEGER NOT NULL,
    "taste" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "grinder" VARCHAR(255),
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "beanId" INTEGER NOT NULL,

    CONSTRAINT "Espresso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bean" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "roaster" VARCHAR(510) NOT NULL,
    "roastLevel" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bean_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Espresso" ADD CONSTRAINT "Espresso_beanId_fkey" FOREIGN KEY ("beanId") REFERENCES "Bean"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
