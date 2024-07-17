import type { APIRoute } from "astro";
import { z, ZodError } from "zod";
import { prisma, argon, jwt } from "../../../utils";

const loginDTOSchema = z.object({
  username: z.string().email("Please input a valid email."),
  password: z.string().min(8, "Please input password with min 8 ch."),
});

const tokenSecret = import.meta.env.TOKEN_SECRET;

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get("Content-Type");
    if (!contentType?.includes("multipart/form-data")) {
      throw new Error("Invalid content-type. Expected multipart/form-data");
    }

    const formData = await request.formData();
    const { username, password } = loginDTOSchema.parse(
      Object.fromEntries(formData.entries())
    );

    const { hash, xata_id } = await prisma.users.findUniqueOrThrow({
      where: { email: username },
      select: { hash: true, xata_id: true },
    });

    const isValid = await argon.verify(hash, password);
    if (isValid) {
      const token = jwt.sign({ data: { userId: xata_id } }, tokenSecret, {
        expiresIn: "16h",
      });

      return new Response(JSON.stringify({message: 'Successfully Logged In!'}), {
        headers: {
          "Content-Type": "application/json",
          user: token,
          "Authorization": `Bearer ${token}`
        },
        status: 200,
        statusText: "Logged in successfully.",
      });
    } else {
      throw new Error('password incorrect!')
    }

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
      status: 500,
    });
  }
};

export const ALL: APIRoute = async ({ request }) => {
  return new Response(
    JSON.stringify({ message: `invalid endpoint! ${request.url}` })
  );
};
