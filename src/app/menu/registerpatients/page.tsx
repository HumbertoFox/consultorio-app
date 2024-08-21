import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import FormPacDocUserConsult from '@/components/forms/formpacdocuserconsult';
import styles from '@/app/menu/page.module.css';

export default function RegisterPatientsPage() {
    return (
        <main className={styles.mainmenu}>
            <h1>Cadastrar Paciente</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faBed} className={styles.icons} />
                <FormPacDocUserConsult docpatuser='patient' buttons='Cadastrar' searchPatDocUserCpf={null} />
            </section>
        </main>
    );
};