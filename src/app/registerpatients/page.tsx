import styles from '@/app/page.module.css';
import FormPatDocUser from '@/components/forms/formpatdocuser';

export default function RegisterPatientsPage() {
    return (
        <main className={styles.mainmenu}>
            <FormPatDocUser docpatuser='patient' buttons='Cadastrar' />
        </main>
    );
};