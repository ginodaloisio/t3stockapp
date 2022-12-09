/*
  Warnings:

  - You are about to drop the column `images` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Images" ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "images";
