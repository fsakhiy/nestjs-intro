-- CreateTable
CREATE TABLE "Cats" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT,
    "birthDate" TIMESTAMP(3),

    CONSTRAINT "Cats_pkey" PRIMARY KEY ("id")
);
