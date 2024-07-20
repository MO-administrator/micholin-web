import { type APIRoute } from "astro";
import { handleErrors, prisma } from "../../../utils";

export const GET: APIRoute = async () => {
  try {
    const posts = await prisma.posts.findMany({
      select: { xata_id: true, author: true },
    });
    return new Response(
      JSON.stringify({ data: posts, message: "retreive posts success." }),
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
