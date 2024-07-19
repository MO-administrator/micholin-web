import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
export * as argon from "argon2";
import JwtService from "./jwt-service";

export const prisma = new PrismaClient();
export const { generateToken, decodeToken } = new JwtService();

export const formatDate = (
  date: number | string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  }
) => new Date(date).toLocaleString(undefined, options);

export const getRandomItem = (list: any[]) => {
  return list[Math.floor(Math.random() * list.length)];
}

export const scrollIntoView = (id: string) => {
  document.querySelector(`#${id}`)?.scrollIntoView({ behavior: "smooth" });
};

export const handleErrors = (error: unknown) => {
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
