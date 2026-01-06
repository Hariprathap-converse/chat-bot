import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const publicRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ];
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If user is authenticated and tries to access public routes, redirect to /chat
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  // If user is NOT authenticated and tries to access protected routes, redirect to /login
  // Protected routes are "/" and "/chat" (and anything else not public)
  if (!token && !isPublicRoute) {
    // Allow access to static files, images, etc. usually handled by Next.js matcher but good to be safe
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/chat",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ],
};
