import { type APIRoute } from 'astro';

export const ALL: APIRoute = () => {
  return new Response(JSON.stringify({ message: "invalid endpoint" }), {
    status: 404,
  });
};

export const GET: APIRoute = () => {
  return new Response(JSON.stringify({ message: 'get all posts.' }), { status: 200 })
}

export const POST: APIRoute = () => {
  return new Response(JSON.stringify({ message: 'create a new post. '}), { status: 200 })
}
