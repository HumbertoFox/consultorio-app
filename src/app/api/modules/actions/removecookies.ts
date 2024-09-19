'use server';
import { cookies } from 'next/headers';
export async function destroySession() {
    const sessionCookies = cookies().get('session');
    if (sessionCookies) {
        cookies().delete('session');
    } else {
        cookies().set('session', 'value', { maxAge: 0 });
    };
};