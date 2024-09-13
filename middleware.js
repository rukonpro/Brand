import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // Redirect if user is not authenticated and trying to access protected routes
    if (!token && pathname.startsWith('/profiles/myAccount')) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('callbackUrl', req.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profiles/myAccount/:path*'],  // Protect the /private route and subroutes
};
