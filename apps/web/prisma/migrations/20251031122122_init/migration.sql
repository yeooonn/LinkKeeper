/*
  Warnings:

  - You are about to drop the column `foldername` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the `_FolderToLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_FolderToLink" DROP CONSTRAINT "_FolderToLink_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_FolderToLink" DROP CONSTRAINT "_FolderToLink_B_fkey";

-- AlterTable
ALTER TABLE "public"."Link" DROP COLUMN "foldername",
ADD COLUMN     "folderId" TEXT;

-- DropTable
DROP TABLE "public"."_FolderToLink";

-- AddForeignKey
ALTER TABLE "public"."Link" ADD CONSTRAINT "Link_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "public"."Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
