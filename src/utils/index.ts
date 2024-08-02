import { PrismaClient } from "@prisma/client";
import ErrorHandler from "./ErrorHandler";

export * as argon from "argon2";
export { getGravatarUrl } from "./get-gravatar";
export { generateVerificationToken } from "./generate-verification-token";
export { sortByPubDate } from "./sort-pub-date";
export { getRandomItem } from "./get-random-item";

export const prisma = new PrismaClient();
export const { handleErrors } = new ErrorHandler();
export const sleep = (time: number = 2e3) => {
  return new Promise(resolve => setTimeout(resolve, time));
};
