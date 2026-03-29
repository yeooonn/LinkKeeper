-- DropForeignKey
ALTER TABLE "public"."Link" DROP CONSTRAINT "Link_foldername_fkey";

-- CreateTable
CREATE TABLE "public"."_FolderToLink" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FolderToLink_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FolderToLink_B_index" ON "public"."_FolderToLink"("B");

-- AddForeignKey
ALTER TABLE "public"."_FolderToLink" ADD CONSTRAINT "_FolderToLink_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FolderToLink" ADD CONSTRAINT "_FolderToLink_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
