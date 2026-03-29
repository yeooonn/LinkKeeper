/*
  Warnings:

  - A unique constraint covering the columns `[folderId,title]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Made the column `folderId` on table `Link` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Link" ALTER COLUMN "folderId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Link_folderId_title_key" ON "public"."Link"("folderId", "title");
