import { type APIRoute } from "astro";
import { AstroAuth } from "auth-astro/server";
import config from 'auth:config';

export const { GET, POST } = AstroAuth(config);

export const ALL: APIRoute = async ({ params, redirect }) => {
  switch (params["slug"]) {
    default:
      return redirect("/api", 307);
  }
};
