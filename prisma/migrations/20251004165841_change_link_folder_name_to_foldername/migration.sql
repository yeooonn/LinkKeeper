/*
  Warnings:

  - You are about to drop the column `folderName` on the `Link` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Link" DROP CONSTRAINT "Link_folderName_fkey";

-- AlterTable
ALTER TABLE "public"."Link" DROP COLUMN "folderName",
ADD COLUMN     "foldername" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Link" ADD CONSTRAINT "Link_foldername_fkey" FOREIGN KEY ("foldername") REFERENCES "public"."Folder"("name") ON DELETE SET NULL ON UPDATE CASCADE;
