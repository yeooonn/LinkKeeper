/*
  Warnings:

  - You are about to drop the column `folderId` on the `Link` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Link" DROP CONSTRAINT "Link_folderById_fkey";

-- AlterTable
ALTER TABLE "public"."Link" DROP COLUMN "folderId";
