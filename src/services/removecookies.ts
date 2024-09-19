'use server';
import { cookies } from 'next/headers';
export async function destroySession() {
    cookies().set('session', '');
    cookies().set('session', 'value', { maxAge: 0 });
    cookies().delete('session');
};