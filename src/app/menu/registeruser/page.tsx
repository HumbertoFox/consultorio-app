'use client';

import Icon from '@/components/Icons/Icons';
import styles from '@/app/menu/page.module.css';
import FormPacDocUserConsult from '@/components/forms/formfull';

export default function RegisterUserPage() {
    return (
        <main className={styles.mainmenu}>
            <h1>Cadastrar Usuário</h1>

            <section className={styles.menusection}>
                <Icon
                    icon={'fa-solid fa-user-plus'}
                    className={styles.icons}
                />
                <FormPacDocUserConsult
                    docpatuser='user'
                    buttons='Cadastrar'
                    searchPatDocUserCpf={null}
                />
            </section>
        </main>
    );
}