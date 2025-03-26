import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../helpers/helpers.js";
import { HTTP_STATUS, SUBTITLE_MESSAGES } from "../constants/constants.js";
import * as Subtitles from "../services/subtitles.service.js";

export const getAllSubtitleDocs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subtitles = await Subtitles.getAllDocs();
    sendResponse(res, HTTP_STATUS.OK, subtitles);
  } catch (error: any) {
    next(error);
  }
};

export const createSubtitleDoc = async (
  req: Request & { file?: Express.Multer.File },
  res: Response,
  next: NextFunction
) => {
  try {
    const subtitleDoc = await Subtitles.createDoc(req.file!, req.user.id);
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
) => {
  try {
    await Subtitles.deleteDoc(req.params.id, req.user.id);
    sendResponse(res, HTTP_STATUS.OK, { message: SUBTITLE_MESSAGES.DELETED });
  } catch (error: any) {
    next(error);
  }
};

export const updateSubtitleBlock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedBlock = await Subtitles.updateBlock(req.params.id, req.body);
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
) => {
  try {
    await Subtitles.deleteBlock(req.params.id);
    sendResponse(res, HTTP_STATUS.OK, { message: SUBTITLE_MESSAGES.DELETED });
  } catch (error: any) {
    next(error);
  }
};
