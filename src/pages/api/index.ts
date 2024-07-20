import type { APIRoute } from "astro";

export const ALL: APIRoute = async () => {
  return new Response(JSON.stringify({ message: "API endpoint invalid!" }), {
    status: 401,
  });
};
