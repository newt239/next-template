import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_PATHS = new Set([
  "/favicon.ico",
  "/icon.svg",
  "/login",
  "/manifest.webmanifest",
  "/opengraph-image",
  "/register",
  "/robots.txt",
  "/sitemap.xml",
]);

export const proxy = (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;

  if (PUBLIC_PATHS.has(pathname) || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  if (getSessionCookie(request)) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirectTo", pathname + search);
  return NextResponse.redirect(loginUrl);
};

export const config = {
  matcher: ["/((?!_next|__nextjs).*)"],
};
