import styles from '@/app/menu/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPatDocUser from '@/components/forms/formpatdocuser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBedPulse } from '@fortawesome/free-solid-svg-icons';

export default function EditPatientsPage() {
    return (
        <main className={styles.mainmenu}>
            <h1>Editar Paciente</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faBedPulse} className={styles.icons} />
                <SearchForm type='patient' />
                <FormPatDocUser docpatuser='patient' buttons='Editar' />
            </section>
        </main>
    );
};