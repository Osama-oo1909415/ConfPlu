-- CreateTable
CREATE TABLE "Paper" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "abstract" TEXT NOT NULL,
    "reviewId" TEXT,
    "presentorId" TEXT,
    CONSTRAINT "Paper_presentorId_fkey" FOREIGN KEY ("presentorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "affiliations" TEXT
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "contribution" TEXT NOT NULL,
    "strength" TEXT NOT NULL,
    "weakness" TEXT NOT NULL,
    "evalutation" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,
    CONSTRAINT "Review_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PaperToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PaperToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Paper" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PaperToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PaperToSession" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PaperToSession_A_fkey" FOREIGN KEY ("A") REFERENCES "Paper" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PaperToSession_B_fkey" FOREIGN KEY ("B") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Paper_presentorId_key" ON "Paper"("presentorId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_paperId_key" ON "Review"("paperId");

-- CreateIndex
CREATE UNIQUE INDEX "_PaperToUser_AB_unique" ON "_PaperToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PaperToUser_B_index" ON "_PaperToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PaperToSession_AB_unique" ON "_PaperToSession"("A", "B");

-- CreateIndex
CREATE INDEX "_PaperToSession_B_index" ON "_PaperToSession"("B");
