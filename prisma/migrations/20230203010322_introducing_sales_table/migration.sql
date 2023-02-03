-- CreateTable
CREATE TABLE "Sales" (
    "id" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "soldAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorEmail" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
