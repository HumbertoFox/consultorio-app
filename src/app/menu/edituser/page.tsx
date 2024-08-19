import styles from '@/app/menu/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPatDocUser from '@/components/forms/formpatdocuser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';

export default function EditUserPage() {
    return (
        <main className={styles.mainmenu}>
            <h1>Editar Usuário</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faUserPen} className={styles.icons} />
                <SearchForm type='user' />
                <FormPatDocUser docpatuser='user' buttons='Editar' />
            </section>
        </main>
    );
};