-- DropForeignKey
ALTER TABLE "SubtitleAccess" DROP CONSTRAINT "SubtitleAccess_documentId_fkey";

-- AddForeignKey
ALTER TABLE "SubtitleAccess" ADD CONSTRAINT "SubtitleAccess_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "SubtitleDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
