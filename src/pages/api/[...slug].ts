import type { APIRoute } from "astro";
import { z } from "zod";
import { handleErrors, prisma } from "@utils";
import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export const ALL: APIRoute = async ({ redirect }) => {
  return redirect("/api", 307);
};

export const GET: APIRoute = async ({ redirect, params, url }) => {
  try {
    if ("slug" in params && params.slug?.includes("forms-meta")) {
      const formKey = url.searchParams.get("name");

      if (formKey) {
        let formMeta: CollectionEntry<"forms">;
        switch (formKey) {
          case "basic-info":
            formMeta = await getEntry("forms", "basic-info");
            break;
          case "contact":
            formMeta = await getEntry("forms", "contact");
            break;
          default:
            throw new Error("invalid key.");
        }
        return new Response(JSON.stringify(formMeta.data), {
          status: 200,
          statusText: "OK",
        });
      }

      const formsCollection = await getCollection("forms");
      return new Response(JSON.stringify(formsCollection), {
        status: 200,
        statusText: "OK",
      });
    }
    return redirect("/api", 307);
  } catch (error) {
    return handleErrors(error);
  }
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

export const POST: APIRoute = async context => {
  if ("slug" in context.params) {
    if (context.params.slug?.includes("inquiry")) {
      return handleInquiry(context);
    }
    if (context.params.slug?.includes("profile")) {
      return handleProfile(context);
    }
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
    const contentType = request.headers.get("Content-Type");
    if (!contentType?.includes("multipart/form-data")) {
      throw new TypeError("Invalid content-type. Expected multipart/form-data");
    }
    const formData = await request.formData();
    const payload = userDtoSchema.parse(Object.fromEntries(formData.entries()));

    return new Response(JSON.stringify({ message: "user updated.", payload }), {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    return handleErrors(error);
  }
};
