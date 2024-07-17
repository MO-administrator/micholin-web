import { type APIRoute } from 'astro';
import { handleErrors } from '../../../utils';

export const GET: APIRoute = () => {
  try {
    return new Response(JSON.stringify({ message: "get all posts." }), {
      status: 200,
    });
  } catch (error) {
    return handleErrors(error);
  }
}

export const POST: APIRoute = () => {
  try {
    return new Response(JSON.stringify({ message: "create a new post. " }), {
      status: 200,
    });
  } catch (error) {
    return handleErrors(error);
  }
}

export const ALL: APIRoute = () => {
  return new Response(JSON.stringify({ message: "invalid endpoint" }), {
    status: 404,
  });
};
