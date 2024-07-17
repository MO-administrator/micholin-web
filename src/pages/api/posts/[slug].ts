import type { APIRoute } from "astro";
import { handleErrors } from "../../../utils";

export const PUT: APIRoute = ({ params }) => {
  try {
    const { slug } = params;
    if (!slug) {
      return new Response(JSON.stringify({ message: "invalid slug" }), {
        status: 400,
      });
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
      return new Response(JSON.stringify({ message: "invalid slug" }), {
        status: 400,
      });
    }
    return new Response(JSON.stringify({ message: `delete ${slug}` }), {
      status: 200,
    });
  } catch (error) {
    return handleErrors(error);
  }
};

export const ALL: APIRoute = () => {
  return new Response(JSON.stringify({ message: "invalid endpoint" }), {
    status: 404,
  });
};
