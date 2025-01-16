// // import { auth } from "@/auth";
// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import { getUserData } from "./app/actions/user";
// import { auth } from "./auth";

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   // Exclude public routes from middleware checks
//   const publicRoutes = ["/sign-in", "/confirm-subscription"];
//   if (publicRoutes.some((route) => pathname.startsWith(route))) {
//     return NextResponse.next();
//   }

//   // Fetch session
//   const session = await auth();

//   if (!session) {
//     // Redirect unauthenticated users to /sign-in
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   // Fetch user data
//   const userData = await getUserData();

//   if (!userData?.subscription && !pathname?.startsWith("/subscription")) {
//     // Redirect users without subscriptions to /confirm-subscription
//     return NextResponse.redirect(new URL("/confirm-subscription", request.url));
//   }

//   // Allow access to protected routes
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };

// export default middleware;

// import { auth } from "@/auth";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUserData } from "./app/actions/user";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static assets and public routes
  if (
    pathname.startsWith("/_next/") || // Covers /_next/static and /_next/image
    pathname === "/favicon.ico" ||
    pathname.startsWith("/assets/") ||
    ["/sign-in", "/sign-up", "/forget-password", "/confirm-subscription"].some(
      (route) => pathname.startsWith(route)
    )
  ) {
    return NextResponse.next();
  }

  try {
    // Authenticate the user
    const session = await auth();
    if (!session) {
      // If not authenticated, redirect to sign-in
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Fetch user data
    const { data: userData } = await getUserData();

    // If the user has no subscription, enforce `/confirm-subscription` route
    if (!userData?.subscription) {
      if (pathname !== "/confirm-subscription") {
        // Redirect to `/confirm-subscription` if the user is not already there
        return NextResponse.redirect(
          new URL("/confirm-subscription", request.url)
        );
      }
    } else {
      // If the user has a subscription and is trying to access `/confirm-subscription`, redirect away
      if (pathname === "/confirm-subscription") {
        return NextResponse.redirect(new URL("/", request.url)); // Redirect to home or dashboard
      }
    }
  } catch (error) {
    console.error("Middleware error:", error);
    // Redirect to sign-in if any error occurs during auth or user data retrieval
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|assets/).*)"], // Streamlined matcher
};

export default middleware;
