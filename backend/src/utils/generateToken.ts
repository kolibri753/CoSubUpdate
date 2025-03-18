import jwt from "jsonwebtoken";
import { Response } from "express";
import {
  JWT_EXPIRATION,
  COOKIE_MAX_AGE,
  COOKIE_NAME,
} from "../config/authConfig.js";

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: JWT_EXPIRATION,
  });

  res.cookie(COOKIE_NAME, token, {
    maxAge: COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

export default generateToken;
