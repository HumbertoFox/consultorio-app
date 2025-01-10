import SideBar from '@/components/sidebar';
import styles from '@/app/consultations/page.module.css';

export default function SideBarLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className={styles.main}>
            <SideBar />
            {children}
        </main>
    );
}