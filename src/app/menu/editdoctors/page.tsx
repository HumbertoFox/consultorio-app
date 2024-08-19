import styles from '@/app/menu/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPatDocUser from '@/components/forms/formpatdocuser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNurse } from '@fortawesome/free-solid-svg-icons';

export default function EditDoctorPage() {
    return (
        <main className={styles.mainmenu}>
            <h1>Editar Doutor(a)</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faUserNurse} className={styles.icons} />
                <SearchForm type='doctor' />
                <FormPatDocUser docpatuser='doctors' buttons='Editar' />
            </section>
        </main>
    );
};