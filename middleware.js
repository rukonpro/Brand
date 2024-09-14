import { NextResponse } from 'next/server';


export async function middleware(req) {
    const sessionToken =await req.cookies.get('next-auth.session-token');

    // Redirect if user is not authenticated and trying to access protected routes
    if (!sessionToken) {
        const loginUrl = await new URL('/login', req.url);
          await loginUrl.searchParams.set('callbackUrl', req.url); // Preserve the current route for redirection after login
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        // '/myAccount/:path*',
        // '/myCart/:path*',
        // '/myOrders/:path*',
        // '/saveForLater/:path*',
        // '/settings/:path*'
    ],
};
