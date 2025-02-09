import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUserData } from "./app/actions/user";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const excludedPaths = [
    "/_next/",
    "/favicon.ico",
    "/opengraph-image.png",
    "/assets/",
    "/sign-in",
    "/sign-up",
    "/forget-password",
    "/confirm-subscription",
    "/paymenttest",
  ];

  if (excludedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  try {
    const session = await auth();
    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const { data: userData } = await getUserData();
    if (!userData?.subscription) {
      return NextResponse.redirect(
        new URL("/confirm-subscription", request.url)
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Middleware error:", error.message);
    } else {
      console.error("Middleware error:", error);
    }
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|assets/).*)"],
};

export default middleware;
