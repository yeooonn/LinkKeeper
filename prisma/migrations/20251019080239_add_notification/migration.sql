/*
  Warnings:

  - You are about to drop the column `isAlert` on the `Link` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."AlertType" AS ENUM ('NONE', 'ONE_HOUR', 'ONE_DAY', 'ONE_WEEK', 'CUSTOM');

-- AlterTable
ALTER TABLE "public"."Link" DROP COLUMN "isAlert",
ADD COLUMN     "alertType" "public"."AlertType" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "customAlertDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "linkId" INTEGER NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alertType" "public"."AlertType" NOT NULL,
    "message" TEXT,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Notification_userId_linkId_idx" ON "public"."Notification"("userId", "linkId");

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "public"."Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
