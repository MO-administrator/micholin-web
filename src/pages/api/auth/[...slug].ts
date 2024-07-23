import { type APIRoute } from "astro";
import config from 'auth:config';
import { AstroAuth } from "auth-astro/server";

export const { GET, POST } = AstroAuth(config);

export const ALL: APIRoute = async ({ params, redirect }) => {
  switch (params["slug"]) {
    default:
      return redirect("/api", 307);
  }
};
