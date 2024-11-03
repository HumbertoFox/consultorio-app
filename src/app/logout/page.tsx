'use client';

import { DNA } from 'react-loader-spinner';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { destroySession } from '../api/modules/actions/removecookies';
import styles from '@/app/page.module.css';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            const success = await destroySession();
            if (success) {
                router.push('/login');
            } else {
                console.error('Falha ao excluir o cookie.');
            };
        };

        const timer = setTimeout(logout, 3000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <section className={styles.logout}>
            <DNA
                visible={true}
                height='100'
                width='100'
                ariaLabel='dna-loading'
                wrapperStyle={{}}
                wrapperClass='dna-wrapper'
            />
            <span>Logging out...</span>
        </section>
    );
};