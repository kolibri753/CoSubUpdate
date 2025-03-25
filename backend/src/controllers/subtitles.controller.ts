import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";
import { sendResponse } from "../helpers/sendResponse.helper.js";
import { HTTP_STATUS, SUBTITLE_MESSAGES } from "../constants/constants.js";
import SrtParser from "srt-parser-2";

const parser = new SrtParser();

export const getAllSubtitleDocs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subtitles = await prisma.subtitleDocument.findMany({
      include: { contributors: true, createdBy: true, subtitleBlocks: true },
    });
    sendResponse(res, HTTP_STATUS.OK, subtitles);
  } catch (error: any) {
    next(error);
  }
};

export const createSubtitleDoc = async (
  req: Request & { file?: Express.Multer.File },
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, {
        error: SUBTITLE_MESSAGES.UPLOAD_REQUIRED,
      });
    }

    const createdById = req.user.id;
    const fileName = req.file.originalname;

    const existingDoc = await prisma.subtitleDocument.findFirst({
      where: { name: fileName, createdById },
    });

    if (existingDoc) {
      return sendResponse(res, HTTP_STATUS.CONFLICT, {
        error: SUBTITLE_MESSAGES.ALREADY_EXISTS,
      });
    }

    const srtContent = req.file.buffer.toString("utf-8");
    const parsedSubtitles = parser.fromSrt(srtContent);

    const subtitleDoc = await prisma.subtitleDocument.create({
      data: {
        name: fileName,
        createdById,
        subtitleBlocks: {
          create: parsedSubtitles.map((sub, index) => ({
            orderIndex: index,
            startTime: sub.startSeconds,
            endTime: sub.endSeconds,
            text: sub.text,
          })),
        },
      },
      include: { subtitleBlocks: true },
    });

    sendResponse(res, HTTP_STATUS.CREATED, {
      message: SUBTITLE_MESSAGES.CREATED,
      subtitleDoc,
    });
  } catch (error: any) {
    next(error);
  }
};

export const deleteSubtitleDoc = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingDoc = await prisma.subtitleDocument.findUnique({
      where: { id },
      include: { subtitleBlocks: true },
    });

    if (!existingDoc) {
      return sendResponse(res, HTTP_STATUS.NOT_FOUND, {
        error: SUBTITLE_MESSAGES.NOT_FOUND,
      });
    }

    if (existingDoc.createdById !== userId) {
      return sendResponse(res, HTTP_STATUS.FORBIDDEN, {
        error: "You are not authorized to delete this document.",
      });
    }

    await prisma.subtitleDocument.delete({
      where: { id },
    });

    sendResponse(res, HTTP_STATUS.OK, { message: SUBTITLE_MESSAGES.DELETED });
  } catch (error: any) {
    next(error);
  }
};

export const updateSubtitleBlock = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { text, startTime, endTime } = req.body;

    const existingBlock = await prisma.subtitleBlock.findUnique({
      where: { id },
    });
    if (!existingBlock) {
      return sendResponse(res, HTTP_STATUS.NOT_FOUND, {
        error: SUBTITLE_MESSAGES.NOT_FOUND,
      });
    }

    const updatedBlock = await prisma.subtitleBlock.update({
      where: { id },
      data: { text, startTime, endTime },
    });

    sendResponse(res, HTTP_STATUS.OK, {
      message: SUBTITLE_MESSAGES.UPDATED,
      updatedBlock,
    });
  } catch (error: any) {
    next(error);
  }
};

export const deleteSubtitleBlock = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const existingBlock = await prisma.subtitleBlock.findUnique({
      where: { id },
    });
    if (!existingBlock) {
      return sendResponse(res, HTTP_STATUS.NOT_FOUND, {
        error: SUBTITLE_MESSAGES.NOT_FOUND,
      });
    }

    await prisma.subtitleBlock.delete({ where: { id } });

    sendResponse(res, HTTP_STATUS.OK, { message: SUBTITLE_MESSAGES.DELETED });
  } catch (error: any) {
    next(error);
  }
};
