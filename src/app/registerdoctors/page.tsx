import styles from '@/app/page.module.css';
import FormPatDocUser from '@/components/forms/formpatdocuser';

export default function RegisterDoctorsPage() {
    return (
        <div className={styles.divmainforms}>
            <FormPatDocUser docpatuser='doctors' buttons='Cadastrar' />
        </div>
    );
};