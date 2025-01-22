// import type { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import { getUserData } from "./app/actions/user";
// import { auth } from "./auth";

// export async function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   if (
//     pathname.startsWith("/_next/") ||
//     pathname === "/favicon.ico" ||
//     pathname.startsWith("/assets/") ||
//     ["/sign-in", "/sign-up", "/forget-password", "/confirm-subscription"].some(
//       (route) => pathname.startsWith(route)
//     )
//   ) {
//     return NextResponse.next();
//   }

//   try {
//     const session = await auth();
//     if (!session) {
//       return NextResponse.redirect(new URL("/sign-in", request.url));
//     }

//     const { data: userData } = await getUserData();
//     if (!userData?.subscription) {
//       return NextResponse.redirect(
//         new URL("/confirm-subscription", request.url)
//       );
//     }
//   } catch (error) {
//     console.error("Middleware error:", error);
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next/|favicon.ico|assets/).*)"],
// };

// export default middleware;

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getUserData } from "./app/actions/user";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define excluded paths for faster matching
  const excludedPaths = [
    "/_next/",
    "/favicon.ico",
    "/opengraph-image.png",
    "/assets/",
    "/sign-in",
    "/sign-up",
    "/forget-password",
    "/confirm-subscription",
  ];

  // Skip middleware for excluded paths
  if (excludedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  try {
    // Authenticate user
    const session = await auth();
    if (!session) {
      // Redirect unauthenticated users to sign-in
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Fetch user data and check subscription status
    const { data: userData } = await getUserData();
    if (!userData?.subscription) {
      // Redirect users without a subscription
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
    // Redirect to sign-in on error
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Allow request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|assets/).*)"], // Match all paths except excluded ones
};

export default middleware;
