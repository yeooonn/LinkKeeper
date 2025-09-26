-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT,
    "password" TEXT,
    "github_id" TEXT,
    "avatar" TEXT DEFAULT '@/shared/assets/img/defaultProfile.png'
);

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "User_userEmail_key" ON "User"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_github_id_key" ON "User"("github_id");
