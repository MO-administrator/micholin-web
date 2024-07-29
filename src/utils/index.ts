import { PrismaClient } from "@prisma/client";
import ErrorHandler from "./ErrorHandler";

export * as argon from "argon2";
export { getGravatarUrl } from "./get-gravatar";
export { generateVerificationToken } from "./generate-verification-token";
export { sortByPubDate } from "./sort-pub-date";
export { getRandomItem } from "./get-random-item";
export { isAuthenticated } from "./is-authenticated";

export const prisma = new PrismaClient();
export const { handleErrors } = new ErrorHandler();
