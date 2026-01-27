import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
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

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  if (!token && !isPublicRoute) {
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
