'use server';
import { cookies } from 'next/headers';
export async function destroySession() {
    const Cookies = cookies().get('session')?.value;
    Cookies ? cookies().delete('session') : cookies().set('session', 'value', { maxAge: 0 });
};