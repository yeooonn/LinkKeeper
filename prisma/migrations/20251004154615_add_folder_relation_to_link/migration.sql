/*
  Warnings:

  - You are about to drop the column `filename` on the `Link` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Folder` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Link" DROP COLUMN "filename",
ADD COLUMN     "folderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Folder_name_key" ON "public"."Folder"("name");

-- AddForeignKey
ALTER TABLE "public"."Link" ADD CONSTRAINT "Link_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "public"."Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
