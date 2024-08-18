import styles from '@/app/page.module.css';
import FormPatDocUser from '@/components/forms/formpatdocuser';

export default function RegisterUserPage() {
    return (
        <main className={styles.mainmenu}>
            <FormPatDocUser docpatuser='user' buttons='Cadastrar' />
        </main>
    );
};