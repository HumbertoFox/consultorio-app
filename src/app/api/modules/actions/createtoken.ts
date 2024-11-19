'use server';

import * as jose from 'jose';
import { cookies } from 'next/headers';
import { openSessionToken } from '@/app/api/modules/actions/opentoken';

export async function createSessionToken(payload = {}) {
    try {
        if (!process.env.AUTH_SECRET) {
            throw new Error('AUTH_SECRET is not defined');
        };

        const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
        const sessionAuthToken = await new jose.SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('1d')
            .sign(secret);
        const { exp } = await openSessionToken(sessionAuthToken);

        (await cookies()).set('sessionAuthToken', sessionAuthToken, {
            httpOnly: true,
            path: '/',
            domain: '.vercel.app',
            secure: true,
            sameSite: 'lax',
            expires: new Date((exp as number) * 1000)
        });
    } catch (error) {
        console.error('Error creating session token:', error);
        
        throw new Error('Failed to create session token');
    };
};