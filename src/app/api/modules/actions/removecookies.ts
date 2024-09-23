'use server';
import { cookies } from 'next/headers';
export async function destroySession() {
    const cookieStore = cookies();
    const sessionCookies = cookieStore.get('session');
    if (sessionCookies) {
        cookieStore.set('session', 'value', { maxAge: 0 });
    } else {
        cookieStore.delete('session');
    };
};