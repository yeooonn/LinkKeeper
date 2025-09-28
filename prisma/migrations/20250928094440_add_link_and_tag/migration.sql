-- CreateTable
CREATE TABLE "Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "alert" BOOLEAN NOT NULL,
    "bookmark" BOOLEAN NOT NULL,
    "hasRead" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "linkId" INTEGER NOT NULL,
    CONSTRAINT "Tag_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
