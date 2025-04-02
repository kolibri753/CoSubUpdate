import prisma from "../db/prisma.js";
import SrtParser from "srt-parser-2";
import {
  ACCESS_MESSAGES,
  AccessType,
  SUBTITLE_MESSAGES,
} from "../constants/constants.js";

const parser = new SrtParser();

export const getDocs = async (userId: string) => {
  return prisma.subtitleDocument.findMany({
    where: {
      OR: [
        { createdById: userId },
        {
          SubtitleAccess: {
            some: {
              userId,
              accessType: { in: [AccessType.VIEW, AccessType.EDIT] },
            },
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

  if (!doc) throw new Error(SUBTITLE_MESSAGES.NOT_FOUND);
  if (doc.createdById !== ownerId)
    throw new Error(ACCESS_MESSAGES.NO_PERMISSION);

  const existingAccess = doc.SubtitleAccess.find(
    (access) => access.userId === viewerId
  );
  if (existingAccess) throw new Error(ACCESS_MESSAGES.ALREADY_HAS_ACCESS);

  await prisma.subtitleAccess.create({
    data: {
      userId: viewerId,
      documentId: docId,
      accessType: AccessType.VIEW,
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

  if (!doc) throw new Error(SUBTITLE_MESSAGES.NOT_FOUND);
  if (doc.createdById !== ownerId)
    throw new Error(ACCESS_MESSAGES.NO_PERMISSION);

  const existingAccess = doc.SubtitleAccess.find(
    (access) => access.userId === editorId
  );

  if (existingAccess) {
    if (existingAccess.accessType === AccessType.EDIT)
      throw new Error(ACCESS_MESSAGES.ALREADY_EDITOR);

    await prisma.subtitleAccess.update({
      where: { id: existingAccess.id },
      data: { accessType: AccessType.EDIT },
    });
  } else {
    await prisma.subtitleAccess.create({
      data: {
        userId: editorId,
        documentId: docId,
        accessType: AccessType.EDIT,
      },
    });
  }
};

export const removeAccess = async (
  docId: string,
  ownerId: string,
  targetUserId: string
) => {
  const doc = await prisma.subtitleDocument.findUnique({
    where: { id: docId },
    include: { SubtitleAccess: true },
  });

  if (!doc) throw new Error(SUBTITLE_MESSAGES.NOT_FOUND);
  if (doc.createdById !== ownerId)
    throw new Error(ACCESS_MESSAGES.NO_PERMISSION);

  const existingAccess = doc.SubtitleAccess.find(
    (access) => access.userId === targetUserId
  );

  if (!existingAccess) throw new Error(ACCESS_MESSAGES.NO_ACCESS);

  if (existingAccess.accessType === AccessType.EDIT) {
    await prisma.subtitleAccess.update({
      where: { id: existingAccess.id },
      data: { accessType: AccessType.VIEW },
    });

    return ACCESS_MESSAGES.DOWNGRADED_TO_VIEWER;
  } else {
    await prisma.subtitleAccess.delete({
      where: { id: existingAccess.id },
    });

    return ACCESS_MESSAGES.REMOVED_ACCESS;
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
  if (doc.createdById !== userId) throw new Error(SUBTITLE_MESSAGES.FORBIDDEN);

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
