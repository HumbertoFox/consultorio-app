import styles from '@/app/menu/page.module.css';
import FormPatDocUser from '@/components/forms/formpatdocuser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';

export default function RegisterPatientsPage() {
    return (
        <main className={styles.mainmenu}>
            <h1>Cadastrar Paciente</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faBed} className={styles.icons} />
                <FormPatDocUser docpatuser='patient' buttons='Cadastrar' />
            </section>
        </main>
    );
};