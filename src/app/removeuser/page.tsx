import styles from '@/app/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPatDocUser from '@/components/forms/formpatdocuser';

export default function RemoveUserPage() {
    return (
        <div className={styles.main}>
            <SearchForm />
            <FormPatDocUser docpatuser='user' buttons='Remover' />
        </div>
    );
};