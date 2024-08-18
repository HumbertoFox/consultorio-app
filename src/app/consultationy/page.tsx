import styles from '@/app/page.module.css';
import FormConsultation from '@/components/forms/formconsultation';
import SideBar from '@/components/sidebar';

export default function ConsultationyPage() {
    return (
        <main className={styles.main}>
            <SideBar />
            <div className={styles.divmain}>
                <FormConsultation crm={6733} />
            </div>
        </main>
    );
};