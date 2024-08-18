import styles from '@/app/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPatDocUser from '@/components/forms/formpatdocuser';

export default function EditPatientsPage() {
    return (
        <div className={styles.main}>
            <SearchForm />
            <FormPatDocUser docpatuser='patient' buttons='Editar' />
        </div>
    );
};