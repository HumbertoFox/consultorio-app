'use client';
import { cookies } from 'next/headers';

export async function destroySession() {
    cookies().delete('session');
};