/*
  Warnings:

  - You are about to drop the column `price` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "price",
ALTER COLUMN "type" DROP NOT NULL;
