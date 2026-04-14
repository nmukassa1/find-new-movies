import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getRequestIp, rateLimit, RateLimitError } from "@/lib/rate-limit";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (
    path.startsWith("/api/auth/callback/credentials") &&
    request.method === "POST"
  ) {
    try {
      await rateLimit({
        name: "signin-credentials",
        identifier: getRequestIp(request),
        limit: 10,
        windowLabel: "15 m",
        windowMs: 15 * 60 * 1000,
      });
    } catch (e) {
      if (e instanceof RateLimitError) {
        return NextResponse.json(
          { error: "Too many sign-in attempts" },
          { status: 429 },
        );
      }
      throw e;
    }
    return NextResponse.next();
  }

  if (path.startsWith("/watchlist")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      const login = new URL("/login", request.url);
      login.searchParams.set("callbackUrl", request.nextUrl.pathname);
      return NextResponse.redirect(login);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/watchlist/:path*", "/api/auth/callback/credentials"],
};
