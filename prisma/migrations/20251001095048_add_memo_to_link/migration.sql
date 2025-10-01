/*
  Warnings:

  - You are about to drop the column `alert` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `bookmark` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `hasRead` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `Link` table. All the data in the column will be lost.
  - Added the required column `isAlert` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isBookmark` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isRead` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Link" DROP COLUMN "alert",
DROP COLUMN "bookmark",
DROP COLUMN "hasRead",
DROP COLUMN "link",
ADD COLUMN     "isAlert" BOOLEAN NOT NULL,
ADD COLUMN     "isBookmark" BOOLEAN NOT NULL,
ADD COLUMN     "isRead" BOOLEAN NOT NULL,
ADD COLUMN     "memo" TEXT,
ADD COLUMN     "url" TEXT NOT NULL;
