import type { APIRoute } from "astro";
import { handleErrors } from "@utils";
import { z } from "zod";

const todoDtoSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  completed: z.boolean(),
});

const JSON_SERVER_BASE = "https://my-json-server.typicode.com";
const GIT_USERNAME = "olinfernandes";
const GIT_REPO = "FakeDB";

const url = (item: string) => {
  return `${JSON_SERVER_BASE}/${GIT_USERNAME}/${GIT_REPO}/${item}`;
};
const options = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

export const GET: APIRoute = async () => {
  try {
    const response = await fetch(url("todos"), options);
    let todos = await response.json();
    return new Response(JSON.stringify(todos), {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    return handleErrors(error);
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = todoDtoSchema.parse(await request.json());
    const response = await fetch(url("todos"), {
      ...options,
      method: "POST",
      body: JSON.stringify(payload),
    });
    if(response.ok){
      const data = await response.json();
      console.log(data);
    }
    return new Response(JSON.stringify({ message: "created a new todo." }), {
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    return handleErrors(error);
  }
};

export const ALL: APIRoute = async ({ redirect }) => {
  return redirect("/api", 307);
};
