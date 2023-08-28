/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Cats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cats_uuid_key" ON "Cats"("uuid");
