import prisma from "../db/prisma.js";
import bcryptjs from "bcryptjs";
import { SALT_ROUNDS } from "../config/authConfig.js";
import { UserSignUpRequestDto, UserSignUpResponseDto } from "../types/auth.js";
import { Gender } from "../constants/constants.js";

export const createUser = async (
  data: UserSignUpRequestDto
): Promise<UserSignUpResponseDto> => {
  const { fullName, username, password, gender } = data;

  const salt = await bcryptjs.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcryptjs.hash(password, salt);

  const newUser = await prisma.user.create({
    data: {
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: getProfilePic(username, gender),
    },
  });

  return {
    id: newUser.id,
    fullName: newUser.fullName,
    username: newUser.username,
    profilePic: newUser.profilePic ?? "",
  };
};

export const getUserByUsername = async (username: string) => {
  return prisma.user.findUnique({ where: { username } });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const validatePassword = async (
  password: string,
  hashedPassword: string
) => {
  return bcryptjs.compare(password, hashedPassword);
};

export const getProfilePic = (username: string, gender: Gender) => {
  return gender === Gender.male
    ? `https://avatar.iran.liara.run/public/boy?username=${username}`
    : `https://avatar.iran.liara.run/public/girl?username=${username}`;
};
