import type { APIRoute } from "astro";
import { z } from "zod";
import { argon, decodeToken, handleErrors, prisma } from "../../../utils";

const updatePasswordDTOSchema = z.object({
  password: z.string().min(8, "password must be a minimum of 8 characters."),
});

export const PUT: APIRoute = async ({ request }) => {
  try {
    const token = request.headers.get("user");

    if (!token) {
      throw new Error("Not authorized.");
    }

    const { payload } = decodeToken(token);

    if (typeof payload != "string") {
      const userId = payload.data.userId;

      const user = await prisma.users.findUniqueOrThrow({
        where: { xata_id: userId },
        select: { hash: true },
      });

      const formData = await request.formData();

      const { password } = updatePasswordDTOSchema.parse(
        Object.fromEntries(formData.entries()),
      );

      if (await argon.verify(user.hash, password)) {
        throw new Error("please choose a new password.");
      }

      const hash = await argon.hash(password);

      await prisma.users.update({ where: { xata_id: userId }, data: { hash } });

      return new Response(JSON.stringify({ message: "password updated." }), {
        status: 200,
      });
    }
  } catch (error) {
    return handleErrors(error);
  }
  console.log("Why are we here?");
  return new Response(JSON.stringify({ message: "something went wrong" }), {
    status: 500,
  });
};

export const ALL: APIRoute = ({ redirect }) => {
  return redirect("/api", 307);
};
