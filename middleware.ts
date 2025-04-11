import { NextResponse } from "next/server";
import { auth } from "./auth";

// Export the auth middleware and add your custom logic inside
export default auth((req) => {
    // req.auth contains the user's session if they're logged in
    // req.nextUrl contains the URL information

    const { nextUrl, auth } = req;
    const isLoggedIn = !!auth;

    const isProtectedRoute = nextUrl.pathname.startsWith("/espressos") ||
        nextUrl.pathname.startsWith("/beans")

    // ✅ Redirect authenticated users from '/' to '/espressos'
    if (isLoggedIn && nextUrl.pathname === "/") {
        const redirectUrl = new URL("/espressos", nextUrl.origin);
        return NextResponse.redirect(redirectUrl);
    }

    // 🔒 Redirect unauthenticated users to login
    if (!isLoggedIn && isProtectedRoute) {
        // Redirect to login page
        const redirectUrl = new URL("/api/auth/signin", nextUrl.origin);
        // Save the original URL as a query parameter to redirect back after login
        redirectUrl.searchParams.set("callbackUrl", nextUrl.pathname);
        return NextResponse.redirect(redirectUrl);
    }

    // If you don't need custom logic, you can just return NextResponse.next()
    return NextResponse.next();
});

// Define which routes this middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
};