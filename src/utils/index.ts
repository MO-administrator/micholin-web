import { PrismaClient } from "@prisma/client";
import { Resend } from 'resend';
import { ZodError } from "zod";
export * as argon from "argon2";
export * from './salt-hash-password';
import JwtService from "./jwt-service";

export const prisma = new PrismaClient();
export const resend = new Resend(import.meta.env.AUTH_RESEND_KEY);
export const { generateToken, decodeToken } = new JwtService();

/**
 * Formats a date to locale string
 * @param date input date
 * @param options date format options
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
 * @param list list of items
 * @returns {any}
 */
export const getRandomItem = (list: any[]): any => {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * Scroll to the target section
 * @param id target section id
 * @returns {void}
 */
export const scrollIntoView = (id: string): void => {
  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
};

/**
 * Global API error handler
 * @param error Any error
 * @returns {Response}
 */
export const handleErrors = (error: unknown): Response => {
  if (error instanceof ZodError) {
    const response = error.issues.map(
      ({ path, message }: { path: (string | number)[]; message: string }) => ({
        [path.join("-")]: message,
      })
    );
    return new Response(JSON.stringify(response), {
      status: 400,
    });
  }
  if (error instanceof SyntaxError) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
  if (error instanceof TypeError) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
  if (error instanceof Error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
  console.warn(error);
  return new Response(JSON.stringify(error), {
    status: 500,
  });
};
