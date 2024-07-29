import type { APIRoute } from "astro";

export const ALL: APIRoute = async ({ params, redirect }) => {
  switch (params["slug"]) {
    default:
      return redirect("/api", 307);
  }
};
