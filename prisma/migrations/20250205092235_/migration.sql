-- CreateTable
CREATE TABLE "Bankcard" (
    "id" TEXT NOT NULL,
    "cardNumber" VARCHAR(20) NOT NULL,
    "country" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bankcard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "bankCardId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bankcard_cardNumber_key" ON "Bankcard"("cardNumber");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bankCardId_fkey" FOREIGN KEY ("bankCardId") REFERENCES "Bankcard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
