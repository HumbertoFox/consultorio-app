'use server';
import * as jose from 'jose';

export async function openSessionToken(token: string) {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);

    return payload;
};