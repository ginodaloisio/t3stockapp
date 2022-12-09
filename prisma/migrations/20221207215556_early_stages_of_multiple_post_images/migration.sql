-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY['https://i.imgur.com/VBYOm20.jpeg']::TEXT[];
