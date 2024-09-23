'use server';
import { cookies } from 'next/headers';
export async function destroySession() {
    const sessionCookies = cookies().get('session');
    if (sessionCookies) {
        cookies().delete('session');
        return sessionCookies;
    };
    cookies().set('session', 'value', { maxAge: 0 });
    return true;
};