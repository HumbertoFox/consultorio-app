'use server';

import { cookies } from 'next/headers';
import { openSessionToken } from '@/app/api/modules/actions/opentoken';

export async function isSessionValid(): Promise<boolean> {
    const sessionCookies = (await cookies()).get('sessionAuthToken');

    if (sessionCookies) {
        const { value } = sessionCookies;
        const { exp } = await openSessionToken(value);
        const currentDate = new Date().getTime();
        return ((exp as number) * 1000) > currentDate;
    };
    
    return false;
};