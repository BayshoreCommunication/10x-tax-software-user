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


  if (
    pathname.startsWith("/_next/") || 
    pathname === "/favicon.ico" ||
    pathname.startsWith("/assets/") ||
    ["/sign-in", "/sign-up", "/forget-password", "/confirm-subscription"].some(
      (route) => pathname.startsWith(route)
    )
  ) {
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
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|assets/).*)"], 
};

export default middleware;
