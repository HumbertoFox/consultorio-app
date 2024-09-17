'use client';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '@/app/menu/page.module.css';
import FormPacDocUserConsult from '@/components/forms/formpacdocuserconsult';
export default function RegisterUserPage() {
    return (
        <main className={styles.mainmenu}>
            <h1>Cadastrar Usuário</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faUserPlus} className={styles.icons} />
                <FormPacDocUserConsult docpatuser='user' buttons='Cadastrar' searchPatDocUserCpf={null} />
            </section>
        </main>
    );
};