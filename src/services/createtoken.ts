'use server';
import * as jose from 'jose';
import { cookies } from 'next/headers';
import { openSessionToken } from './opentoken';

export async function createSessionToken(payload = {}) {
    try {
        const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
        const session = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1d')
            .sign(secret);

        const { exp } = await openSessionToken(session);

        cookies().set('session', session, {
            expires: new Date((exp as number) * 1000),
            path: '/',
            domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'consultorio-app.vercel.app',
            secure: process.env.NODE_ENV === 'production' || true,
            httpOnly: true,
            sameSite: 'strict'
        });
    } catch (error) {
        console.error('Error creating session token:', error);
        throw new Error('Failed to create session token');
    };
};