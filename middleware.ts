import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/_next/static")) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
  }

  if (request.nextUrl.pathname.startsWith("/images")) {
    response.headers.set("Cache-Control", "public, max-age=86400");
  }

  return response;
}

export const config = {
  matcher: ["/_next/static/:path*", "/images/:path*"],
};
