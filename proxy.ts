
import { auth as proxy } from "@/auth";
import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "./route";


export default proxy((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isAuthPrefix = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  if (isAuthPrefix) {
    return null
  }

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL("/auth/login",nextUrl))
  }

})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}