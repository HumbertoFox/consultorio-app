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
            path: '/',
            domain: 'consultorio-app.vercel.app',
            secure: true,
            httpOnly: true,
            sameSite: 'none',
            expires: new Date((exp as number) * 1000)
        });
    } catch (error) {
        console.error('Error creating session token:', error);
        throw new Error('Failed to create session token');
    };
};