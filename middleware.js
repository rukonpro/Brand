import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXT_PUBLIC_SECRET_KEY });
    const { pathname } = req.nextUrl;

    // Redirect if user is not authenticated and trying to access protected routes
    if (!token && pathname !== "/login") {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", req.url); // লগইন করার পরে ফিরে যাওয়ার জন্য
        return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
       '/myAccount/:path*',
       '/myCart/:path*',
       '/myOrders/:path*',
       '/saveForLater/:path*',
       '/settings/:path*'
    ],
};
