import { PrismaClient } from "@prisma/client";
export * as argon from "argon2";
import jwt from "jsonwebtoken";
import { ZodError } from 'zod';

const tokenSecret = import.meta.env.TOKEN_SECRET;

export const formatDate = (
  date: number | string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
) => new Date(date).toLocaleString(undefined, options);

export const getRandomItem = (list: any[]) =>
  list[Math.floor(Math.random() * list.length)];

export const scrollIntoView = (id: string) => {
  document.addEventListener("astro:page-load", () => {
    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
  });
};

export const generateToken = (userId: string) => {
  return jwt.sign({ data: { userId } }, tokenSecret, {
    expiresIn: "16h",
  });
};

export const decodeToken = (token: string) => {
  return jwt.verify(token, tokenSecret, {
    complete: true,
  });
}

export const handleErrors = (error: unknown) => {
  if (error instanceof ZodError) {
      const response = error.issues.map(
        ({
          path,
          message,
        }: {
          path: (string | number)[];
          message: string;
        }) => ({
          [path.join("-")]: message,
        })
      );
      return new Response(JSON.stringify(response), {
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
}

export const prisma = new PrismaClient();
