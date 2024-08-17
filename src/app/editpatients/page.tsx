import FormPatDocUser from '@/components/forms/formpatdocuser';
import styles from '@/app/page.module.css';
import SearchForm from '@/components/forms/formsearch';

export default function EditPatientsPage() {
    return (
        <div className={styles.divmainforms}>
            <SearchForm />
            <FormPatDocUser doctors={false} buttons='Cadastrar' />
        </div>
    );
};