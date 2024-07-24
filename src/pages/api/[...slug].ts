import type { APIRoute } from "astro";
import { z } from "zod";
import { handleErrors, prisma } from "../../utils";
import { getSession } from "auth-astro/server";

export const ALL: APIRoute = async ({ redirect }) => {
  return redirect("/api", 307);
};

const inquiryDtoSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  message: z.string(),
});
const userDtoSchema = z.object({
  name: z.string(),
});

export const POST: APIRoute = async ({ params, request, redirect }) => {
  if (params["slug"]?.includes("inquiry")) {
    try {
      const contentType = request.headers.get("Content-Type");
      if (!contentType?.includes("multipart/form-data")) {
        throw new TypeError(
          "Invalid content-type. Expected multipart/form-data"
        );
      }
      const formData = await request.formData();

      const data = inquiryDtoSchema.parse(
        Object.fromEntries(formData.entries())
      );

      await prisma.inquiry.create({ data });

      return new Response(JSON.stringify({ message: "inquiry added" }), {
        status: 200,
        statusText: "OK",
      });
    } catch (error) {
      return handleErrors(error);
    }
  }
  if (params["slug"]?.includes("profile")) {
    try {
      const session = await getSession(request);
      if (!session || !session.user?.email)
        throw new Error("valid session required!");
      const contentType = request.headers.get("Content-Type");
      if (!contentType?.includes("multipart/form-data")) {
        throw new TypeError(
          "Invalid content-type. Expected multipart/form-data"
        );
      }
      const formData = await request.formData();
      const payload = userDtoSchema.parse(
        Object.fromEntries(formData.entries())
      );

      await prisma.user.update({
        where: { email: session.user.email },
        data: { ...payload },
        select: { id: true, name: true, email: true },
      });

      return new Response(JSON.stringify({ message: "user updated." }), {
        status: 200,
        statusText: "OK",
      });
    } catch (error) {
      return handleErrors(error);
    }
  }
  return redirect("/api", 307);
};
