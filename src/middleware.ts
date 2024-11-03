'use server';

import { isSessionValid } from '@/app/api/modules/actions/isvalid';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico).*)'
};

const publicRoutes = ['/login', '/logout'];

export async function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    };

    const session = await isSessionValid();

    if (!session) {
        const isAPIRoute = pathname.startsWith('/api');
        if (isAPIRoute) {
            return { status: 401, Error: true, message: 'Não autorizado' };
        };
        return NextResponse.redirect(new URL('/login', req.url));
    };
    
    return NextResponse.next();
};