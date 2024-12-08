'use server';

import { cookies } from 'next/headers';
import { openSessionToken } from '@/app/api/modules/actions/opentoken';

export async function isSessionValid(): Promise<boolean> {
    const sessionCookies = (await cookies()).get('sessionAuthToken');

    if (sessionCookies) {
        const { value } = sessionCookies;

        try {
            const sessionData = await openSessionToken(value);

            // Check if sessionData is valid and contains 'exp'
            if (sessionData && sessionData.exp) {
                const { exp } = sessionData;
                const currentDate = new Date().getTime();
                return ((exp as number) * 1000) > currentDate;
            } else {
                console.error('Session data is invalid or missing "exp" property.');
                return false;
            }
        } catch (error) {
            console.error('Error while checking session validity:', error);
            return false;
        }
    }

    return false;
};