'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export async function destroySession() {
    cookies().delete('sessionAuthToken');
    redirect('/logout');
};