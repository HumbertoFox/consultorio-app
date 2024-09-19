'use server';
import { cookies } from 'next/headers';
export async function destroySession() {
    const value  = cookies().get('session')?.value;
    cookies().set('session', 'value');
    cookies().delete('session');
};