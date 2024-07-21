import type { APIRoute } from "astro";
import { z } from "zod";
import { handleErrors, prisma } from "../../utils";

export const ALL: APIRoute = async ({ redirect }) => {
  return redirect("/api", 307);
};

const inquiryDtoSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  message: z.string(),
});

export const POST: APIRoute = async ({ params, request, redirect }) => {
  if (params["slug"] === "inquiry") {
    try {
      const contentType = request.headers.get("Content-Type");
      if (!contentType?.includes("multipart/form-data")) {
        throw new Error("Invalid content-type. Expected multipart/form-data");
      }
      const formData = await request.formData();

      const data = await inquiryDtoSchema.parseAsync(
        Object.fromEntries(formData.entries())
      );

      await prisma.inquiry.create({ data });

      return new Response(JSON.stringify({ message: "inquiry added" }));
    } catch (error) {
      return handleErrors(error);
    }
  }
  return redirect("/api", 307);
};
