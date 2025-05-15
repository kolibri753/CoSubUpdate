-- AlterTable
ALTER TABLE "SubtitleBlock" ADD COLUMN     "lockedAt" TIMESTAMP(3),
ADD COLUMN     "lockedById" TEXT;

-- CreateIndex
CREATE INDEX "SubtitleBlock_lockedById_idx" ON "SubtitleBlock"("lockedById");
