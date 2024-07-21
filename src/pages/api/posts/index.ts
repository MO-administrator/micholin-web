import { type APIRoute } from "astro";
import { handleErrors } from "../../../utils";

export const GET: APIRoute = async () => {
  try {
    return new Response(
      JSON.stringify({ message: "retreive posts success." }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleErrors(error);
  }
};

export const POST: APIRoute = async () => {
  try {
    return new Response(JSON.stringify({ message: "create a new post. " }), {
      status: 200,
    });
  } catch (error) {
    return handleErrors(error);
  }
};

export const ALL: APIRoute = async ({ redirect }) => {
  return redirect("/api", 307);
};
