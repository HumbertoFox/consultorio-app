'use client';

import { useState } from 'react';
import { InputsRegisterPatientProps } from '@/interfaces/interfaces';
import Icon from '@/components/Icons/Icons';
import styles from '@/app/menu/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPacDocUserConsult from '@/components/forms/formfull';

export default function EditDoctorPage() {
    const [searchPatDocUserCpf, setSearchPatDocUserCpf] = useState<InputsRegisterPatientProps | null>(null);
    const handleCpfSearch = (result: InputsRegisterPatientProps) => setSearchPatDocUserCpf(result);

    return (
        <main className={styles.mainmenu}>
            <h1>Editar Doutor(a)</h1>

            <section className={styles.menusection}>
                <Icon
                    icon={'fa-solid fa-user-doctor'}
                    className={styles.icons}
                />
                <SearchForm
                    type='doctor'
                    searchPatDocUserCpf={handleCpfSearch}
                />
                <FormPacDocUserConsult
                    docpatuser='editdoctor'
                    buttons='Editar'
                    searchPatDocUserCpf={searchPatDocUserCpf}
                />
            </section>
        </main>
    );
}