import type { APIRoute } from "astro";
import { argon, jwt, prisma } from "../../../utils";
import { z, ZodError } from "zod";

const tokenSecret = import.meta.env.TOKEN_SECRET;

const updatePasswordDTOSchema = z.object({
  password: z.string().min(8, "password must be a minimum of 8 characters."),
});

export const PUT: APIRoute = async ({ request }) => {
  try {
    const user = request.headers.get("user");
    if (!user) {
      throw new Error("Not authorized.");
    }
    const decodedToken = jwt.verify(user, tokenSecret, {
      complete: true,
    });
    const { payload } = decodedToken;
    if (typeof payload != "string") {
      const userId = payload.data.userId;
      const user = await prisma.users.findUniqueOrThrow({
        where: { xata_id: userId },
        select: { hash: true },
      });
      const formData = await request.formData();
      const { password } = updatePasswordDTOSchema.parse(
        Object.fromEntries(formData.entries())
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
    if (error instanceof Error) {
      return new Response(JSON.stringify({ message: error.message }), { status: 401 })
    }
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
    console.warn(error);
    return new Response(JSON.stringify({ message: "Unauthorized." }), {
      status: 401,
    });
  }
  console.log("Why are we here?");
  return new Response(JSON.stringify({ message: "something went wrong" }), {
    status: 500,
  });
};

export const ALL: APIRoute = () => {
  return new Response(JSON.stringify({ message: "invalid endpoint." }), {
    status: 400,
  });
};
