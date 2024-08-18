import styles from '@/app/page.module.css';
import FormPatDocUser from '@/components/forms/formpatdocuser';

export default function RegisterUserPage() {
    return (
        <div className={styles.main}>
            <FormPatDocUser docpatuser='user' buttons='Cadastrar' />
        </div>
    );
};