import type { APIRoute } from "astro";
import { z } from "zod";
import { prisma, argon, generateToken, handleErrors } from "../../../utils";

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
    const { username, password } = loginDTOSchema.parse(
      Object.fromEntries(formData.entries()),
    );

    const { hash, xata_id } = await prisma.users.findUniqueOrThrow({
      where: { email: username },
      select: { hash: true, xata_id: true },
    });

    const isValid = await argon.verify(hash, password);

    if (isValid) {
      const token = generateToken(xata_id);

      return new Response(
        JSON.stringify({ message: "Successfully Logged In!" }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            user: token,
          },
          status: 200,
        },
      );
    } else {
      throw new Error("password incorrect!");
    }
  } catch (error) {
    return handleErrors(error);
  }
};

export const ALL: APIRoute = async ({ redirect }) => {
  return redirect("/api", 307);
};
