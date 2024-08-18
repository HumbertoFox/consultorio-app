import styles from '@/app/page.module.css';
import FormPatDocUser from '@/components/forms/formpatdocuser';

export default function RegisterPatientsPage() {
    return (
        <div className={styles.main}>
            <FormPatDocUser docpatuser='patient' buttons='Cadastrar' />
        </div>
    );
};