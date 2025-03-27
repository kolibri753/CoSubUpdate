/*
  Warnings:

  - You are about to drop the `_DocumentEditors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DocumentViewers` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('VIEW', 'EDIT');

-- DropForeignKey
ALTER TABLE "_DocumentEditors" DROP CONSTRAINT "_DocumentEditors_A_fkey";

-- DropForeignKey
ALTER TABLE "_DocumentEditors" DROP CONSTRAINT "_DocumentEditors_B_fkey";

-- DropForeignKey
ALTER TABLE "_DocumentViewers" DROP CONSTRAINT "_DocumentViewers_A_fkey";

-- DropForeignKey
ALTER TABLE "_DocumentViewers" DROP CONSTRAINT "_DocumentViewers_B_fkey";

-- AlterTable
ALTER TABLE "ChangeHistory" ALTER COLUMN "oldStartTime" SET DATA TYPE TEXT,
ALTER COLUMN "newStartTime" SET DATA TYPE TEXT,
ALTER COLUMN "oldEndTime" SET DATA TYPE TEXT,
ALTER COLUMN "newEndTime" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "_DocumentEditors";

-- DropTable
DROP TABLE "_DocumentViewers";

-- CreateTable
CREATE TABLE "SubtitleAccess" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "accessType" "AccessType" NOT NULL,

    CONSTRAINT "SubtitleAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubtitleAccess_userId_documentId_key" ON "SubtitleAccess"("userId", "documentId");

-- AddForeignKey
ALTER TABLE "SubtitleAccess" ADD CONSTRAINT "SubtitleAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubtitleAccess" ADD CONSTRAINT "SubtitleAccess_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "SubtitleDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
