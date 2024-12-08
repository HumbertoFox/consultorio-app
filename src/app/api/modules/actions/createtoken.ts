import 'server-only';
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
            .setIssuedAt()
            .setExpirationTime('1d')
            .sign(secret);
        const tokenResponse = await openSessionToken(sessionAuthToken);

        const exp = tokenResponse?.exp;
        if (!exp) {
            throw new Error('Expiration time not found in token response');
        };

        (await cookies()).set('sessionAuthToken', sessionAuthToken, {
            httpOnly: true,
            secure: true,
            expires: new Date((exp as number) * 1000),
            sameSite: 'lax',
            path: '/',
        });
    } catch (error) {
        console.error('Error creating session token:', error);

        throw new Error('Failed to create session token');
    };
};