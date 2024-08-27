'use server';
import { cookies } from 'next/headers';

export async function destroySession() {
    cookies().set('session', '', {
        expires: new Date(0),
        path: '/',
        domain: 'consultorio-app.vercel.app',
        secure: true
    });
};