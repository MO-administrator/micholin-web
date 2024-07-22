import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import ErrorHandler from "./ErrorHandler";
export * as argon from "argon2";

export const prisma = new PrismaClient();
export const resend = new Resend(import.meta.env.AUTH_RESEND_KEY);
export const { handleErrors } = new ErrorHandler();

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
 * Scroll to the target section
 * @param {string} id target section id
 * @returns {void}
 */
export const scrollIntoView = (id: string): void => {
  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
};
