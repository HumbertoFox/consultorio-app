import styles from '@/app/menu/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPatDocUser from '@/components/forms/formpatdocuser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserXmark } from '@fortawesome/free-solid-svg-icons';

export default function RemoveUserPage() {
    return (
        <main className={styles.mainmenu}>
            <h1>Deletar Usuário</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faUserXmark} className={styles.icons} />
                <SearchForm type='user' />
                <FormPatDocUser docpatuser='user' buttons='Remover' />
            </section>
        </main>
    );
};