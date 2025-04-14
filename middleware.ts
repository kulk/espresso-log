import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    // Only redirect from the home page
    if (req.nextUrl.pathname === '/') {
        if (token) {
            const url = req.nextUrl.clone();
            url.pathname = '/espressos';
            return NextResponse.redirect(url);
        }
    }

    // Allow the request to proceed
    return NextResponse.next();
}