import { NextFunction, Request, Response } from "express";
import {
  createUser,
  getUserByUsername,
  validatePassword,
  getUserById,
} from "../services/user.service.js";
import { UserSignUpRequestDto, UserSignInRequestDto } from "../types/auth.js";
import {
  AUTH_MESSAGES,
  COMMON_MESSAGES,
  HTTP_STATUS,
} from "../constants/constants.js";
import { sendResponse } from "../helpers/sendResponse.helper.js";
import generateToken from "../utils/generateToken.js";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password, confirmPassword } =
      req.body as UserSignUpRequestDto;

    if (password !== confirmPassword) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, {
        error: AUTH_MESSAGES.PASSWORD_MISMATCH,
      });
    }

    if (await getUserByUsername(username)) {
      return sendResponse(res, HTTP_STATUS.BAD_REQUEST, {
        error: AUTH_MESSAGES.USERNAME_TAKEN,
      });
    }

    const { confirmPassword: _, ...userData } = req.body;
    const newUser = await createUser(userData);

    generateToken(newUser.id, res);
    sendResponse(res, HTTP_STATUS.CREATED, newUser);
  } catch (error: any) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body as UserSignInRequestDto;

    const user = await getUserByUsername(username);
    if (!user || !(await validatePassword(password, user.password))) {
      sendResponse(res, HTTP_STATUS.BAD_REQUEST, {
        error: AUTH_MESSAGES.INVALID_CREDENTIALS,
      });
      return;
    }

    generateToken(user.id, res);
    sendResponse(res, HTTP_STATUS.OK, {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    sendResponse(res, HTTP_STATUS.OK, {
      message: AUTH_MESSAGES.LOGOUT_SUCCESS,
    });
  } catch (error: any) {
    console.error("Error in logout controller:", error.message);
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, {
      error: COMMON_MESSAGES.INTERNAL_SERVER_ERROR,
    });
  }
};

export const getAuthenticatedUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await getUserById(req.user.id);

    if (!user) {
      sendResponse(res, HTTP_STATUS.NOT_FOUND, {
        error: AUTH_MESSAGES.USER_NOT_FOUND,
      });
      return;
    }

    sendResponse(res, HTTP_STATUS.OK, {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error: any) {
    next(error);
  }
};
