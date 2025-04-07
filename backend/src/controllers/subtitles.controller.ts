import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../helpers/helpers.js";
import {
  ACCESS_MESSAGES,
  HTTP_STATUS,
  SUBTITLE_MESSAGES,
} from "../constants/constants.js";
import * as Subtitles from "../services/subtitles.service.js";

export const getAllSubtitleDocs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subtitles = await Subtitles.getDocs(req.user.id);
    sendResponse(res, HTTP_STATUS.OK, subtitles);
  } catch (error: any) {
    next(error);
  }
};

export const getSubtitleDocById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const subtitleDoc = await Subtitles.getDocById(req.params.id, req.user.id);
    sendResponse(res, HTTP_STATUS.OK, subtitleDoc);
  } catch (error: any) {
    next(error);
  }
};

export const addSubtitleAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: docId } = req.params;
    const { userId, accessType } = req.body;
    const ownerId = req.user.id;
    const result = await Subtitles.updateSubtitleAccess(
      docId,
      ownerId,
      userId,
      accessType
    );
    sendResponse(res, HTTP_STATUS.OK, result);
  } catch (error) {
    next(error);
  }
};

export const removeSubtitleAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    const docId = req.params.id;
    const message = await Subtitles.removeAccess(docId, req.user.id, userId);
    sendResponse(res, HTTP_STATUS.OK, { message });
  } catch (error) {
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
