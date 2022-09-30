-- CreateEnum
CREATE TYPE "Brands" AS ENUM ('GENERAL', 'VALENZIANA', 'FRANCOVALENTE', 'SIMMONS', 'CANNON');

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "refresh_token_expires_in" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "brand" "Brands" NOT NULL DEFAULT 'GENERAL',
    "title" TEXT NOT NULL,
    "content" TEXT,
    "price" INTEGER,
    "type" TEXT NOT NULL DEFAULT 'Todos',
    "height" INTEGER,
    "width" INTEGER,
    "length_" INTEGER,
    "image" TEXT NOT NULL DEFAULT 'https://i.imgur.com/5eOffBc.jpeg',
    "amount" INTEGER NOT NULL DEFAULT 1,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "authorId" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prices" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
    "postID" INTEGER NOT NULL,

    CONSTRAINT "Prices_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prices" ADD CONSTRAINT "Prices_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prices" ADD CONSTRAINT "Prices_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
