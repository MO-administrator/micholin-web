import type { APIRoute } from "astro";
import { handleErrors } from "../../../utils";

export const PUT: APIRoute = ({ params }) => {
  try {
    const { slug } = params;
    if (!slug) {
      throw new Error("invalid slug");
    }
    return new Response(JSON.stringify({ message: `update ${slug}` }), {
      status: 200,
    });
  } catch (error) {
    return handleErrors(error);
  }
};

export const DELETE: APIRoute = ({ params }) => {
  try {
    const { slug } = params;
    if (!slug) {
      throw new Error("invalid slug");
    }
    return new Response(JSON.stringify({ message: `delete ${slug}` }), {
      status: 200,
    });
  } catch (error) {
    return handleErrors(error);
  }
};

export const ALL: APIRoute = async ({ redirect }) => {
  return redirect("/api", 307);
};
