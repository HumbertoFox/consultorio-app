import styles from '@/app/menu/page.module.css';
import FormPatDocUser from '@/components/forms/formpatdocuser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';

export default function RegisterDoctorsPage() {
    return (
        <main className={styles.mainmenu}>
            <h1>Cadastrar Doutor(a)</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faUserDoctor} className={styles.icons} />
                <FormPatDocUser docpatuser='doctors' buttons='Cadastrar' />
            </section>
        </main>
    );
};