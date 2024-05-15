/*
  Warnings:

  - You are about to drop the `Recurso` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Recurso";

-- CreateTable
CREATE TABLE "imgs" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "imgs_pkey" PRIMARY KEY ("id")
);
