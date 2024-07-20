import { defineMiddleware, sequence } from "astro:middleware";

const first = defineMiddleware((context, next) => {
  if (context.url.pathname.startsWith("/api")) {
    // api endpoints
  }
  return next();
});

export const onRequest = sequence(first);
