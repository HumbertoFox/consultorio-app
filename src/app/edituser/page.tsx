import styles from '@/app/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPatDocUser from '@/components/forms/formpatdocuser';

export default function EditUserPage() {
    return (
        <div className={styles.divmainforms}>
            <SearchForm />
            <FormPatDocUser docpatuser='user' buttons='Editar' />
        </div>
    );
};