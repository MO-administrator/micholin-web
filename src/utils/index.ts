import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import ErrorHandler from "./ErrorHandler";
export * as argon from "argon2";
import SHA256 from "crypto-js/sha256";

export const prisma = new PrismaClient();
export const resend = new Resend(import.meta.env.AUTH_RESEND_KEY || 'resend_test_key');
export const { handleErrors } = new ErrorHandler();

/**
 * Returns a gravatar url string from email source
 * @param {string|null|undefined} email Source email string
 * @param {number|undefined} size Size of image
 * @param {string|undefined} defaultTheme Default image to use on gravatar
 * @returns {string} gravatar url string
 * @see [Gravatar](https://docs.gravatar.com/api/avatars/images/)
 */
export const getGravatarUrl = (
  email: string | null | undefined = "",
  size: number | undefined = 256,
  defaultTheme: string | undefined = "robohash"
): string => {
  const trimmedEmail = email?.trim().toLowerCase();
  const hash = trimmedEmail && SHA256(trimmedEmail);
  return `https://gravatar.com/avatar/${hash}?size=${size}&d=${defaultTheme}`;
};

/**
 * Sorts collection array by pubDate
 * @param a {{data: {pubDate: Date}}}
 * @param b {{data: {pubDate: Date}}}
 * @returns {number}
 */
export const sortByPubDate = (
  a: { data: { pubDate: Date } },
  b: { data: { pubDate: Date } }
): number => {
  return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
};

/**
 * Formats a date to locale string
 * @param {Date} date input date
 * @param {Intl.DateTimeFormatOptions} options date format options
 * @returns {string}
 */
export const formatDate = (
  date: number | string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
): string => new Date(date).toLocaleString(undefined, options);

/**
 * Returns a random item from a list of items
 * @param {Array<any>} list list of items
 * @returns {any}
 */
export const getRandomItem = (list: any[]): any => {
  return list[Math.floor(Math.random() * list.length)];
};

/**
 * Generates a 6-digit verification code.
 * @returns {string} 6-digit verification code
 */
export const generateVerificationToken = async (): Promise<string> => {
  let code = Math.floor(Math.random() * 1e6).toString();
  while (code.length < 6) {
    code = await generateVerificationToken();
  }
  return code.toString();
};
