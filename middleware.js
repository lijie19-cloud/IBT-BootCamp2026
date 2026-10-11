import { NextResponse } from "next/server";

export function middleware(request) {
  const hasSession = Boolean(request.cookies.get("session")?.value);
  if (!hasSession) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"]
};
