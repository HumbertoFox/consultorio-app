'use server';
import * as jose from 'jose';
import { cookies } from 'next/headers';
import { openSessionToken } from './opentoken';

export async function createSessionToken(payload = {}) {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const session = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1d')
        .sign(secret);

    const { exp } = await openSessionToken(session);

    cookies().set('session', session, {
        expires: new Date((exp as number) * 1000),
        path: '/',
        httpOnly: true,
        sameSite: 'none'
    });
};