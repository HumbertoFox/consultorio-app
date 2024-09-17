'use server';
import { cookies } from 'next/headers';
import { openSessionToken } from './opentoken';
export async function isSessionValid(): Promise<boolean> {
    const sessionCookies = cookies().get('session');
    if (sessionCookies) {
        const { value } = sessionCookies;
        const { exp } = await openSessionToken(value);
        const currentDate = new Date().getTime();
        return ((exp as number) * 1000) > currentDate;
    };
    return false;
};