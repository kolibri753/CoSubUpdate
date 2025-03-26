import prisma from "../db/prisma.js";
import SrtParser from "srt-parser-2";
import { SUBTITLE_MESSAGES } from "../constants/constants.js";

const parser = new SrtParser();

export const getAllDocs = async () => {
  return prisma.subtitleDocument.findMany({
    include: { contributors: true, createdBy: true, subtitleBlocks: true },
  });
};

export const createDoc = async (file: Express.Multer.File, userId: string) => {
  const fileName = file.originalname;

  const existingDoc = await prisma.subtitleDocument.findFirst({
    where: { name: fileName, createdById: userId },
  });

  if (existingDoc) throw new Error(SUBTITLE_MESSAGES.ALREADY_EXISTS);

  const parsedSubtitles = parser.fromSrt(file.buffer.toString("utf-8"));

  return prisma.subtitleDocument.create({
    data: {
      name: fileName,
      createdById: userId,
      subtitleBlocks: {
        create: parsedSubtitles.map((sub, index) => ({
          orderIndex: index,
          startTime: sub.startSeconds,
          endTime: sub.endSeconds,
          text: sub.text,
        })),
      },
    },
    include: { createdBy: true, subtitleBlocks: true },
  });
};

export const deleteDoc = async (docId: string, userId: string) => {
  const doc = await prisma.subtitleDocument.findUnique({
    where: { id: docId },
  });

  if (!doc) throw new Error(SUBTITLE_MESSAGES.NOT_FOUND);
  if (doc.createdById !== userId)
    throw new Error("You are not authorized to delete this document.");

  await prisma.subtitleDocument.delete({ where: { id: docId } });
};

export const updateBlock = async (
  blockId: string,
  data: { text?: string; startTime?: number; endTime?: number }
) => {
  const block = await prisma.subtitleBlock.findUnique({
    where: { id: blockId },
  });
  if (!block) throw new Error(SUBTITLE_MESSAGES.NOT_FOUND);

  return prisma.subtitleBlock.update({ where: { id: blockId }, data });
};

export const deleteBlock = async (blockId: string) => {
  const block = await prisma.subtitleBlock.findUnique({
    where: { id: blockId },
  });
  if (!block) throw new Error(SUBTITLE_MESSAGES.NOT_FOUND);

  await prisma.subtitleBlock.delete({ where: { id: blockId } });
};
