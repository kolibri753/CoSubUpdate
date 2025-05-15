/*
  Warnings:

  - You are about to drop the column `lockedAt` on the `SubtitleBlock` table. All the data in the column will be lost.
  - You are about to drop the column `lockedById` on the `SubtitleBlock` table. All the data in the column will be lost.
  - You are about to drop the `ChangeHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChangeHistory" DROP CONSTRAINT "ChangeHistory_blockId_fkey";

-- DropForeignKey
ALTER TABLE "ChangeHistory" DROP CONSTRAINT "ChangeHistory_modifiedById_fkey";

-- DropIndex
DROP INDEX "SubtitleBlock_lockedById_idx";

-- AlterTable
ALTER TABLE "SubtitleBlock" DROP COLUMN "lockedAt",
DROP COLUMN "lockedById";

-- DropTable
DROP TABLE "ChangeHistory";
