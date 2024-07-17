import type { APIRoute } from "astro";
import { z, ZodError } from "zod";
import * as argon from "argon2";
import jwt from "jsonwebtoken";
import { prisma } from "../../../utils";

const tokenSecret = import.meta.env.TOKEN_SECRET;

const registerDTOSchema = z.object({
  username: z.string().email("Please input a valid email"),
  password: z
    .string()
    .min(8, "Please input password with minimum of 8 characters"),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get("Content-Type");
    if (!contentType?.includes("multipart/form-data")) {
      throw new Error("Invalid content-type. Expected multipart/form-data");
    }

    const formData = await request.formData();

    const registerDTO = registerDTOSchema.parse(
      Object.fromEntries(formData.entries())
    );
    const payload = {
      email: registerDTO.username,
      hash: await argon.hash(registerDTO.password),
    };

    const { xata_id } = await prisma.users.create({
      data: payload,
      select: { xata_id: true },
    });

    const token = jwt.sign({ data: { userId: xata_id } }, tokenSecret, {
      expiresIn: "16h",
    });

    return new Response(
      JSON.stringify({ message: "registration successful!" }),
      {
        headers: {
          "Content-Type": "application/json",
          user: token,
        },
        status: 200,
        statusText: "Logged in successfully.",
      }
    );
  } catch (error) {
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
      status: 400,
    });
  }
};

export const ALL: APIRoute = async ({ request }) => {
  return new Response(
    JSON.stringify({ message: `invalid endpoint! ${request.url}` })
  );
};
