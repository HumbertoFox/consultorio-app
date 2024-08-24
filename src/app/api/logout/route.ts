'use server';
import { destroySession } from '@/services/removecookies';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest): Promise<NextResponse> {
    destroySession();
    return NextResponse.redirect(new URL('/login', req.url));
};