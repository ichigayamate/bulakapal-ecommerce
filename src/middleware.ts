import {cookies} from "next/headers";
import {verifyToken} from "@scripts/api/jwt";
import {NextRequest, NextResponse} from "next/server";
import customError from "@scripts/api/custom-error";

export async function middleware(request: NextRequest) {
  const cookie = await cookies();
  const auth = cookie.get("authorization");
  if (request.nextUrl.pathname.startsWith("/api/wishlists")) {
    if (!auth) return Response.json({
      message: "Unauthorized"
    }, {status: 401});

    const [type, token] = auth.value.split(" ");
    if (!type || type !== "Bearer") return Response.json({
      message: "Token type is not supported"
    }, {status: 401});

    try {
      const decoded = await verifyToken(token);

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", decoded._id);
      requestHeaders.set("x-user-email", decoded.email);

      return NextResponse.next({
        request: {
          headers: requestHeaders
        }
      })
    } catch (e) {
      const error = e as Error;
      return customError(error);
    }
  } else if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") {
    if (auth) return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/api/wishlists/:path*", "/wishlist", "/login", "/register"]
}