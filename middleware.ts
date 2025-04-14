import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    // Redirect from home page to espressos page if logged in
    if (req.nextUrl.pathname === '/') {
        if (token) {
            const url = req.nextUrl.clone();
            url.pathname = '/espressos';
            return NextResponse.redirect(url);
        }
    }

    // Protect /beans and /espressos pages
    if (req.nextUrl.pathname === '/beans' ||
        req.nextUrl.pathname === '/espressos' ||
        req.nextUrl.pathname.startsWith('/beans/') ||
        req.nextUrl.pathname.startsWith('/espressos/')
    ) {
        if (!token) {
            // Redirect to login page if not authenticated
            const url = req.nextUrl.clone();
            url.pathname = '/api/auth/signin';
            // Store the original URL to redirect back after login
            url.searchParams.set('callbackUrl', req.nextUrl.href);
            return NextResponse.redirect(url);
        }
    }

    // Allow the request to proceed
    return NextResponse.next();
}

// Define which routes this middleware should run on
export const config = {
    matcher: ['/', '/beans/:path*', '/espressos/:path*', '/beans', '/espressos']
};