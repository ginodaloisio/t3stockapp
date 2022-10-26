/*
  Warnings:

  - The primary key for the `Prices` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Prices" DROP CONSTRAINT "Prices_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Prices_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Prices_id_seq";
