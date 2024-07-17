import type { APIRoute } from "astro";
import { z } from "astro/zod";
import { prisma } from '../../../utils';
import {
  COOKIE_EXPIRES,
  COOKIE_MAX_AGE,
  TOKEN_SECRET,
  TOKEN_NAME,
} from "../../../constants";

const loginDTOSchema = z.object({
  username: z.string().email("Please input a valid email."),
  password: z.string().min(8, "Please input password with min 8 ch."),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get("Content-Type");
    if (!contentType?.includes("multipart/form-data")) {
      throw new Error("Invalid content-type. Expected multipart/form-data");
    }

    const formData = await request.formData();
    const data = loginDTOSchema.parse(Object.fromEntries(formData.entries()));

    /** TODO
     * Add login authentication flow
     * Add JWT token for authentication
     * Add access token to response
     */

    /** Query Xata to get list of users */

    const users = await prisma.users.findMany();
    console.log(users);

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `${TOKEN_NAME}=${TOKEN_SECRET};HttpOnly;SameSite=None;Secure;Max-Age=${
          COOKIE_MAX_AGE
        };Expires=${COOKIE_EXPIRES}`,
      },
      status: 200,
      statusText: "Logged in successfully.",
    });
  } catch (error: any) {
    if (error?.issues?.length) {
      let response;
      if (error.issues.length === 1 && error.issues[0].path.length < 1) {
        response = error.issues[0].message;
      } else {
        response = error.issues.map(
          ({
            path,
            message,
          }: {
            path: (string | number)[];
            message: string;
          }) => ({
            [path.join("-")]: message,
          }),
        );
      }
      return new Response(JSON.stringify(response), {
        status: 400,
      });
    }
    console.warn(error);
    return new Response(JSON.stringify(error), {
      status: 400,
    });
  }
};
