'use client';

import Icon from '@/components/Icons/Icons';
import styles from '@/app/menu/page.module.css';
import FormPacDocUserConsult from '@/components/forms/formfull';

export default function RegisterDoctorsPage() {
    return (
        <main className={styles.mainmenu}>
            <h1>Cadastrar Doutor(a)</h1>

            <section className={styles.menusection}>
                <Icon
                    icon={'fa-solid fa-user-doctor'}
                    className={styles.icons}
                />
                <FormPacDocUserConsult
                    docpatuser='doctor'
                    buttons='Cadastrar'
                    searchPatDocUserCpf={null}
                />
            </section>
        </main>
    );
};