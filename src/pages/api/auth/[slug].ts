import { type APIRoute } from "astro";
import { z } from "zod";
import {
  prisma,
  argon,
  generateToken,
  decodeToken,
  handleErrors,
} from "../../../utils";

const registerDTOSchema = z.object({
  username: z.string().email("Please input a valid email"),
  password: z
    .string()
    .min(8, "Please input password with minimum of 8 characters"),
});
const loginDTOSchema = z.object({
  username: z.string().email("Please input a valid email."),
  password: z.string().min(8, "Please input password with min 8 ch."),
});
const updatePasswordDTOSchema = z.object({
  password: z.string().min(8, "password must be a minimum of 8 characters."),
});

export const ALL: APIRoute = ({ redirect }) => {
  return redirect("/api", 307);
};

export const POST: APIRoute = async ({ params, request, redirect }) => {
  switch (params["slug"]) {
    case "register":
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
          }
        );
      } catch (error) {
        return handleErrors(error);
      }
    case "login":
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
            }
          );
        } else {
          throw new Error("password incorrect!");
        }
      } catch (error) {
        return handleErrors(error);
      }
    default:
      return redirect("/api", 307);
  }
};

export const PUT: APIRoute = async ({ params, request, redirect }) => {
  switch (params["slug"]) {
    case "update-password":
      try {
        const token = request.headers.get("user");

        if (!token) {
          throw new Error("Not authorized.");
        }

        const { payload } = decodeToken(token);

        if (typeof payload == "string") {
          throw new Error("invalid payload");
        }

        const {
          data: { userId },
        } = payload;

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

        await prisma.users.update({
          where: { xata_id: userId },
          data: { hash },
        });

        return new Response(JSON.stringify({ message: "password updated." }), {
          status: 200,
        });
      } catch (error) {
        return handleErrors(error);
      }
    default:
      return redirect("/api", 307);
  }
};
