'use client';
import { destroySession } from '@/services/removecookies';
export async function GetLogout() {
    await destroySession();
};