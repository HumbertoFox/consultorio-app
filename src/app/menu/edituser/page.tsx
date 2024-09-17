'use client';
import { useState } from 'react';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputsRegisterPatientProps } from '@/interfaces/interfaces';
import styles from '@/app/menu/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPacDocUserConsult from '@/components/forms/formpacdocuserconsult';
export default function EditUserPage() {
    const [searchPatDocUserCpf, setSearchPatDocUserCpf] = useState<InputsRegisterPatientProps | null>(null);
    const handleCpfSearch = (result: InputsRegisterPatientProps) => setSearchPatDocUserCpf(result);
    return (
        <main className={styles.mainmenu}>
            <h1>Editar Usuário</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faUserPen} className={styles.icons} />
                <SearchForm type='user' searchPatDocUserCpf={handleCpfSearch} />
                <FormPacDocUserConsult docpatuser='edituser' buttons='Editar' searchPatDocUserCpf={searchPatDocUserCpf} />
            </section>
        </main>
    );
};