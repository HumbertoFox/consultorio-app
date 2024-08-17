import styles from '@/app/page.module.css';
import FormPatDocUser from '@/components/forms/formpatdocuser';

export default function RegisterPatientsPage() {
    return (
        <div className={styles.divmainforms}>
            <FormPatDocUser docpatuser='patient' buttons='Cadastrar'  />
        </div>
    );
};