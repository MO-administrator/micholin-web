import { sequence } from "astro:middleware";
import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";
import type { MiddlewareHandler } from "astro";

const isProtectedRoutes = createRouteMatcher(["/profile(.*)"]);

const authenticationMiddleware: MiddlewareHandler = clerkMiddleware(
  (auth, context, next) => {
    const { redirectToSignIn, userId } = auth();

    if (!userId && isProtectedRoutes(context.request)) {
      return redirectToSignIn();
    }

    return next();
  }
);

const performanceMiddleware: MiddlewareHandler = async ({ request }, next) => {
  let route = request.url;

  let start = performance.now();
  let response = await next();

  let end = performance.now();

  let responseTime = end - start;
  let message: string = "";

  if (responseTime > 2e3) {
    message = `🐢 ${route} loaded in ${responseTime.toFixed(2)}ms`;
  }
  if (responseTime < 2e3 && responseTime > 1e3) {
    message = `🏇 ${route} loaded in ${responseTime.toFixed(2)}ms`;
  }
  if (responseTime < 1e3) {
    message = `🚀 ${route} loaded in ${responseTime.toFixed(2)}ms`;
  }

  console.log(message);

  return response;
};

export const onRequest = sequence(
  authenticationMiddleware,
  performanceMiddleware
);
