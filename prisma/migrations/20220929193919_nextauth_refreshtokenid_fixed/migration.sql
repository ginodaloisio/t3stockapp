/*
  Warnings:

  - Added the required column `refresh_token_id` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "refresh_token_id" INTEGER NOT NULL;
