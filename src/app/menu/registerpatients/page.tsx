'use client';

import Icon from '@/components/Icons/Icons';
import styles from '@/app/menu/page.module.css';
import FormPacDocUserConsult from '@/components/forms/formfull';

export default function RegisterPatientsPage() {
    return (
        <main className={styles.mainmenu}>
            <h1>Cadastrar Paciente</h1>

            <section className={styles.menusection}>
                <Icon icon={'fa-solid fa-hospital-user'} className={styles.icons} />
                <FormPacDocUserConsult docpatuser='patient' buttons='Cadastrar' searchPatDocUserCpf={null} />
            </section>
        </main>
    );
};