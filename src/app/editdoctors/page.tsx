import styles from '@/app/page.module.css';
import FormPatDocUser from '@/components/forms/formpatdocuser';
import SearchForm from '@/components/forms/formsearch';

export default function EditDoctorPage() {
    return (
        <div className={styles.divmainforms}>
            <SearchForm />
            <FormPatDocUser docpatuser='doctors' buttons='Editar'/>
        </div>
    );
};