'use server';
import { cookies } from 'next/headers';
export async function destroySession(): Promise<boolean> {
    const sessionCookies = cookies().get('session');
    if (sessionCookies) {
        cookies().delete('session');
        return true;
    };
    cookies().set('session', 'value', { maxAge: 0 });
    return true;
};