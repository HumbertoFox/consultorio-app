'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GetLogout } from '../api/logout/logoutcookies';
import styles from '../page.module.css';
import ReactLoading from 'react-loading';
export default function LogoutPage() {
    const router = useRouter();
    useEffect(() => {
        const logout = async () => {
            await GetLogout();
            router.push('/login');
        };
        const timer = setTimeout(logout, 3000);
        return () => clearTimeout(timer);
    }, [router]);
    return (
        <section className={styles.logout}>
            <ReactLoading type='spin' color='#79D1FF' height={100} width={100} />
            <div>Logging out...</div>
        </section>
    );
};