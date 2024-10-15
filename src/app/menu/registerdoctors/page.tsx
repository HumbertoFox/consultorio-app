'use client';
import { faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@/app/menu/page.module.css';
import FormPacDocUserConsult from '@/components/forms/formpacdocuserconsult';
export default function RegisterDoctorsPage() {
    return (
        <main className={styles.mainmenu}>
            <h1>Cadastrar Doutor(a)</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faUserDoctor} className={styles.icons} />
                <FormPacDocUserConsult docpatuser='doctor' buttons='Cadastrar' searchPatDocUserCpf={null} />
            </section>
        </main>
    );
};