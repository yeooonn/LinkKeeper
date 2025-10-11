/*
  Warnings:

  - You are about to drop the column `isRead` on the `Link` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Link" DROP COLUMN "isRead";

-- CreateTable
CREATE TABLE "public"."LinkRead" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "linkId" INTEGER NOT NULL,
    "readAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LinkRead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkRead_userId_linkId_key" ON "public"."LinkRead"("userId", "linkId");

-- AddForeignKey
ALTER TABLE "public"."LinkRead" ADD CONSTRAINT "LinkRead_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LinkRead" ADD CONSTRAINT "LinkRead_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "public"."Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
