/*
  Warnings:

  - You are about to drop the column `refresh_token_id` on the `Account` table. All the data in the column will be lost.
  - Added the required column `refresh_token_expires_in` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "refresh_token_id",
ADD COLUMN     "refresh_token_expires_in" INTEGER NOT NULL;
