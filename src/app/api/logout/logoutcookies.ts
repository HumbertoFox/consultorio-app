'use server';
import { destroySession } from '@/app/api/modules/actions/removecookies';
export async function GetLogout() {
    await destroySession();
};