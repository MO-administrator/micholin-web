import type { APIRoute } from "astro";
import { z } from "zod";
import { generateToken, prisma, argon, handleErrors } from "../../../utils";

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
      Object.fromEntries(formData.entries()),
    );
    const payload = {
      email: registerDTO.username,
      hash: await argon.hash(registerDTO.password),
    };

    const { xata_id } = await prisma.users.create({
      data: payload,
      select: { xata_id: true },
    });

    const token = generateToken(xata_id);

    return new Response(
      JSON.stringify({ message: "registration successful!" }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          user: token,
        },
        status: 200,
      },
    );
  } catch (error) {
    return handleErrors(error);
  }
};

export const ALL: APIRoute = async ({ redirect }) => {
  return redirect("/api", 307);
};
