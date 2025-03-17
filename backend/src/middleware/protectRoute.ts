import jwt, { JwtPayload } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";
import {
  HTTP_STATUS,
  AUTH_MESSAGES,
} from "../constants/constants.js";
import { sendResponse } from "../helpers/sendResponse.helper.js";

interface DecodedToken extends JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, {
        error: AUTH_MESSAGES.NO_TOKEN_PROVIDED,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    if (!decoded) {
      return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, {
        error: AUTH_MESSAGES.INVALID_TOKEN,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, username: true, fullName: true, profilePic: true },
    });

    if (!user) {
      return sendResponse(res, HTTP_STATUS.NOT_FOUND, {
        error: AUTH_MESSAGES.USER_NOT_FOUND,
      });
    }

    req.user = user;
    next();
  } catch (error: any) {
    next(error);
  }
};

export default protectRoute;
