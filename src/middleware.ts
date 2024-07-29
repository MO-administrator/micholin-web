import { clerkMiddleware, createRouteMatcher } from '@clerk/astro/server';

const isProtectedRoutes = createRouteMatcher(['/profile(.*)']);

export const onRequest = clerkMiddleware((auth, context) => {
  const { redirectToSignIn, userId } = auth();

  if (!userId && isProtectedRoutes(context.request)) {

    return redirectToSignIn();
  }
});
