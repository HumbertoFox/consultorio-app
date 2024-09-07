'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ReactLoading from 'react-loading';
import styles from '../page.module.css';
export default function LogoutPage() {
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('../api/logout');
        }, 3000);
        return () => clearTimeout(timer);
    }, [router]);
    return (
        <section className={styles.logout}>
            <ReactLoading type='spin' color='#79D1FF' height={100} width={100} />
            <div>Logging out...</div>
        </section>
    );
};