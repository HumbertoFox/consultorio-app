import styles from '@/app/menu/page.module.css';
import FormPatDocUser from '@/components/forms/formpatdocuser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

export default function RegisterUserPage() {
    return (
        <main className={styles.mainmenu}>
            <h1>Cadastrar Usuário</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faUserPlus} className={styles.icons} />
                <FormPatDocUser docpatuser='user' buttons='Cadastrar' />
            </section>
        </main>
    );
};