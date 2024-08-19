'use server';
import AuthService from "@/services/authservice";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico).*)'
};

const publicRoutes = ['/login'];

export async function middleware(req: NextRequest) {

    const pathname = req.nextUrl.pathname;

    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    };

    const session = await AuthService.isSessionValid();
    if (!session) {
        const isAPIRoute = pathname.startsWith('/api');

        if (isAPIRoute) {
            return NextResponse.json({ message: 'Não autorizado' }, { status: 401 })
        };

        return NextResponse.redirect(new URL('/login', req.url));
    };

    return NextResponse.next();
};