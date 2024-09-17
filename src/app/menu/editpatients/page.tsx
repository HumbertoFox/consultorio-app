'use client';
import { useState } from 'react';
import { faBedPulse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputsRegisterPatientProps } from '@/interfaces/interfaces';
import styles from '@/app/menu/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPacDocUserConsult from '@/components/forms/formpacdocuserconsult';
export default function EditPatientsPage() {
    const [searchPatDocUserCpf, setSearchPatDocUserCpf] = useState<InputsRegisterPatientProps | null>(null);
    const handleCpfSearch = (result: InputsRegisterPatientProps) => setSearchPatDocUserCpf(result);
    return (
        <main className={styles.mainmenu}>
            <h1>Editar Paciente</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faBedPulse} className={styles.icons} />
                <SearchForm type='patient' searchPatDocUserCpf={handleCpfSearch} />
                <FormPacDocUserConsult docpatuser='editpatient' buttons='Editar' searchPatDocUserCpf={searchPatDocUserCpf} />
            </section>
        </main>
    );
};