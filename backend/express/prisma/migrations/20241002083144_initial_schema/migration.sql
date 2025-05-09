-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "wallet_address" TEXT NOT NULL,
    "controlled_lovelace" BIGINT NOT NULL,
    "current_stake_pool" TEXT NOT NULL,
    "current_delegated_drep" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HostedPrivateKey" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "password_hash" TEXT NOT NULL,
    "encrypted_private_key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HostedPrivateKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HostedPrivateKey_userId_key" ON "HostedPrivateKey"("userId");

-- AddForeignKey
ALTER TABLE "HostedPrivateKey" ADD CONSTRAINT "HostedPrivateKey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
