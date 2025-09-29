-- CreateTable
CREATE TABLE "public"."User" (
    "userName" TEXT NOT NULL,
    "userEmail" TEXT,
    "password" TEXT,
    "github_id" TEXT,
    "avatar" TEXT DEFAULT '@/shared/assets/img/defaultProfile.png',
    "userId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "public"."Link" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "alert" BOOLEAN NOT NULL,
    "bookmark" BOOLEAN NOT NULL,
    "hasRead" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."LinkTag" (
    "linkId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LinkTag_pkey" PRIMARY KEY ("linkId","tagId")
);

-- CreateTable
CREATE TABLE "public"."Folder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "public"."User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "public"."User"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_github_id_key" ON "public"."User"("github_id");

-- AddForeignKey
ALTER TABLE "public"."Link" ADD CONSTRAINT "Link_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LinkTag" ADD CONSTRAINT "LinkTag_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "public"."Link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LinkTag" ADD CONSTRAINT "LinkTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LinkTag" ADD CONSTRAINT "LinkTag_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Folder" ADD CONSTRAINT "Folder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "public"."Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
