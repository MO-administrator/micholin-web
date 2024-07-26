import type { APIRoute } from "astro";

export const ALL: APIRoute = ({ redirect }) => {
  return redirect("/api", 307);
};
