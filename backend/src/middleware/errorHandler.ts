import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, COMMON_MESSAGES } from "../constants/constants.js";
import { sendResponse } from "../helpers/sendResponse.helper.js";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Error:", err.message);
  sendResponse(res, err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR, {
    error: err.message || COMMON_MESSAGES.INTERNAL_SERVER_ERROR,
  });
};
