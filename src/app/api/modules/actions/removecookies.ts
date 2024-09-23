'use server';
import { cookies } from 'next/headers';
export async function destroySession() {
    const cookieStore = cookies();
    const sessionCookies = cookieStore.get('session');
    if (sessionCookies) {
        cookieStore.delete('session');
    } else {
        cookieStore.set('session', 'value', { maxAge: 0 });
    };
};