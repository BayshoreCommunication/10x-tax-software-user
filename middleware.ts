// import { auth } from "@/auth"; // Your auth function
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const url = req.nextUrl.clone();
//   const session = await auth(req);

//   // Redirect to sign-in if not logged in
//   if (!session) {
//     url.pathname = "/sign-in";
//     return NextResponse.redirect(url);
//   }

//   // Redirect to subscription page if the user is not subscribed
//   if (!session?.user?.subscription && url.pathname !== "/subscription") {
//     url.pathname = "/subscription";
//     return NextResponse.redirect(url);
//   }

//   // Allow access
//   return NextResponse.next();
// }

// // Specify which routes the middleware should run on
// export const config = {
//   matcher: [
//     "/dashboard/:path*", // Apply to all dashboard routes
//     "/protected/:path*", // Example protected routes
//   ],
// };
