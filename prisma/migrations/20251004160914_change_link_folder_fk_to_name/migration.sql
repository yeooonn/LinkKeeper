/*
  Warnings:

  - You are about to drop the column `folderId` on the `Link` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Link" DROP CONSTRAINT "Link_folderId_fkey";

-- AlterTable
ALTER TABLE "public"."Link" DROP COLUMN "folderId",
ADD COLUMN     "folderName" TEXT;

-- AddForeignKey
ALTER TABLE "public"."Link" ADD CONSTRAINT "Link_folderName_fkey" FOREIGN KEY ("folderName") REFERENCES "public"."Folder"("name") ON DELETE SET NULL ON UPDATE CASCADE;
