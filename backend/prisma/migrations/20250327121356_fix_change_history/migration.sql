/*
  Warnings:

  - Changed the type of `oldStartTime` on the `ChangeHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `newStartTime` on the `ChangeHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `oldEndTime` on the `ChangeHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `newEndTime` on the `ChangeHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ChangeHistory" DROP COLUMN "oldStartTime",
ADD COLUMN     "oldStartTime" DOUBLE PRECISION NOT NULL,
DROP COLUMN "newStartTime",
ADD COLUMN     "newStartTime" DOUBLE PRECISION NOT NULL,
DROP COLUMN "oldEndTime",
ADD COLUMN     "oldEndTime" DOUBLE PRECISION NOT NULL,
DROP COLUMN "newEndTime",
ADD COLUMN     "newEndTime" DOUBLE PRECISION NOT NULL;
