import styles from '@/app/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPatDocUser from '@/components/forms/formpatdocuser';

export default function EditUserPage() {
    return (
        <main className={styles.mainmenu}>
            <SearchForm />
            <FormPatDocUser docpatuser='user' buttons='Editar' />
        </main>
    );
};