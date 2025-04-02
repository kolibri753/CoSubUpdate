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

export const addSubtitleViewer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    const docId = req.params.id;
    await Subtitles.addViewer(docId, req.user.id, userId);
    sendResponse(res, HTTP_STATUS.OK, {
      message: ACCESS_MESSAGES.ADDED_AS_VIEWER,
    });
  } catch (error) {
    next(error);
  }
};

export const addSubtitleEditor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    const docId = req.params.id;
    await Subtitles.addEditor(docId, req.user.id, userId);
    sendResponse(res, HTTP_STATUS.OK, {
      message: ACCESS_MESSAGES.ADDED_AS_EDITOR,
    });
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
