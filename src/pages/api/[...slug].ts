import type { APIRoute } from "astro";
import { z } from "zod";
import { handleErrors, prisma } from "@utils";
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
  name: z.string().optional(),
  image: z.string().url().optional(),
});

export const POST: APIRoute = async (context) => {
  if (context.params["slug"]?.includes("inquiry")) {
    return handleInquiry(context);
  }
  if (context.params["slug"]?.includes("profile")) {
    return handleProfile(context)
  }
  return context.redirect("/api", 307);
};

const handleInquiry: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get("Content-Type");
    if (!contentType?.includes("multipart/form-data")) {
      throw new TypeError("Invalid content-type. Expected multipart/form-data");
    }
    const formData = await request.formData();

    const data = inquiryDtoSchema.parse(Object.fromEntries(formData.entries()));

    await prisma.inquiry.create({ data });

    return new Response(JSON.stringify({ message: "inquiry added" }), {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    return handleErrors(error);
  }
};

const handleProfile: APIRoute = async ({ request }) => {
  try {
    const session = await getSession(request);
    if (!session || !session.user?.email)
      throw new Error("valid session required!");
    const contentType = request.headers.get("Content-Type");
    if (!contentType?.includes("multipart/form-data")) {
      throw new TypeError("Invalid content-type. Expected multipart/form-data");
    }
    const formData = await request.formData();
    const payload = userDtoSchema.parse(Object.fromEntries(formData.entries()));

    const data = await prisma.user.update({
      where: { email: session.user.email },
      data: { ...payload },
      select: { id: true, name: true, email: true },
    });

    return new Response(JSON.stringify({ message: "user updated.", data }), {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    return handleErrors(error);
  }
}
