import styles from '@/app/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPatDocUser from '@/components/forms/formpatdocuser';

export default function EditDoctorPage() {
    return (
        <div className={styles.divmainforms}>
            <SearchForm />
            <FormPatDocUser docpatuser='doctors' buttons='Editar'/>
        </div>
    );
};