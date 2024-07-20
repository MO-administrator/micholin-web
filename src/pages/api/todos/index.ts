import { type APIRoute } from "astro";
import { handleErrors, prisma } from "../../../utils";

export const GET: APIRoute = async () => {
  try {
    const todos = await prisma.todos.findMany({
      select: { xata_id: true, title: true, description: true, tasks: true },
    });
    return new Response(
      JSON.stringify({
        data: todos,
        message: 'retreive todos success.',
      }),
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
