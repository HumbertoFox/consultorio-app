import styles from '@/app/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPatDocUser from '@/components/forms/formpatdocuser';

export default function EditPatientsPage() {
    return (
        <main className={styles.mainmenu}>
            <SearchForm />
            <FormPatDocUser docpatuser='patient' buttons='Editar' />
        </main>
    );
};