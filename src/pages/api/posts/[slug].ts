import type { APIRoute } from "astro";

export const ALL: APIRoute = () => {
  return new Response(JSON.stringify({ message: "invalid endpoint" }), {
    status: 404,
  });
};

export const PUT: APIRoute = ({ params }) => {
  const { slug } = params;
  if (!slug) {
    return new Response(JSON.stringify({ message: "invalid slug" }), {
      status: 400,
    });
  }
  return new Response(JSON.stringify({ message: `update ${slug}` }), {
    status: 200,
  });
};

export const DELETE: APIRoute = ({ params }) => {
  const { slug } = params;
  if (!slug) {
    return new Response(JSON.stringify({ message: "invalid slug" }), {
      status: 400,
    });
  }
  return new Response(JSON.stringify({ message: `delete ${slug}` }), {
    status: 200,
  });
};
