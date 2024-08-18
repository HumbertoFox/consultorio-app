import styles from '@/app/page.module.css';
import FormPatDocUser from '@/components/forms/formpatdocuser';

export default function RegisterDoctorsPage() {
    return (
        <main className={styles.mainmenu}>
            <FormPatDocUser docpatuser='doctors' buttons='Cadastrar' />
        </main>
    );
};