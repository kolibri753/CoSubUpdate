import prisma from "../db/prisma.js";
import SrtParser from "srt-parser-2";
import { SUBTITLE_MESSAGES } from "../constants/constants.js";

const parser = new SrtParser();

export const getDocs = async (userId: string) => {
  return prisma.subtitleDocument.findMany({
    where: {
      OR: [
        { createdById: userId },
        {
          SubtitleAccess: {
            some: { userId, accessType: { in: ["VIEW", "EDIT"] } },
          },
        },
      ],
    },
    include: {
      createdBy: true,
      subtitleBlocks: true,
      SubtitleAccess: {
        include: { user: true },
      },
    },
  });
};

export const addViewer = async (
  docId: string,
  ownerId: string,
  viewerId: string
) => {
  const doc = await prisma.subtitleDocument.findUnique({
    where: { id: docId },
    include: { SubtitleAccess: true },
  });

  if (!doc) throw new Error("Document not found.");
  if (doc.createdById !== ownerId)
    throw new Error("Only the owner can share this document.");

  const existingAccess = doc.SubtitleAccess.find(
    (access) => access.userId === viewerId
  );
  if (existingAccess) throw new Error("User already has access.");

  await prisma.subtitleAccess.create({
    data: {
      userId: viewerId,
      documentId: docId,
      accessType: "VIEW",
    },
  });
};

export const addEditor = async (
  docId: string,
  ownerId: string,
  editorId: string
) => {
  const doc = await prisma.subtitleDocument.findUnique({
    where: { id: docId },
    include: { SubtitleAccess: true },
  });

  if (!doc) throw new Error("Document not found.");
  if (doc.createdById !== ownerId)
    throw new Error("Only the owner can share this document.");

  const existingAccess = doc.SubtitleAccess.find(
    (access) => access.userId === editorId
  );

  if (existingAccess) {
    if (existingAccess.accessType === "EDIT")
      throw new Error("User is already an editor.");

    // Upgrade viewer to editor
    await prisma.subtitleAccess.update({
      where: { id: existingAccess.id },
      data: { accessType: "EDIT" },
    });
  } else {
    await prisma.subtitleAccess.create({
      data: {
        userId: editorId,
        documentId: docId,
        accessType: "EDIT",
      },
    });
  }
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
