'use client';

import { useState } from 'react';
import { InputsRegisterPatientProps } from '@/interfaces/interfaces';
import Icon from '@/components/Icons/Icons';
import styles from '@/app/menu/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPacDocUserConsult from '@/components/forms/formfull';

export default function EditPatientsPage() {
    const [searchPatDocUserCpf, setSearchPatDocUserCpf] = useState<InputsRegisterPatientProps | null>(null);
    const handleCpfSearch = (result: InputsRegisterPatientProps) => setSearchPatDocUserCpf(result);

    return (
        <main className={styles.mainmenu}>
            <h1>Editar Paciente</h1>

            <section className={styles.menusection}>
                <Icon
                    icon={'fa-solid fa-hospital-user'}
                    className={styles.icons}
                />
                <SearchForm
                    type='patient'
                    searchPatDocUserCpf={handleCpfSearch}
                />
                <FormPacDocUserConsult
                    docpatuser='editpatient'
                    buttons='Editar'
                    searchPatDocUserCpf={searchPatDocUserCpf}
                />
            </section>
        </main>
    );
};