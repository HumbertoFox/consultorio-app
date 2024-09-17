'use client';
import { useState } from 'react';
import { faUserNurse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputsRegisterPatientProps } from '@/interfaces/interfaces';
import styles from '@/app/menu/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPacDocUserConsult from '@/components/forms/formpacdocuserconsult';
export default function EditDoctorPage() {
    const [searchPatDocUserCpf, setSearchPatDocUserCpf] = useState<InputsRegisterPatientProps | null>(null);
    const handleCpfSearch = (result: InputsRegisterPatientProps) => setSearchPatDocUserCpf(result);
    return (
        <main className={styles.mainmenu}>
            <h1>Editar Doutor(a)</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faUserNurse} className={styles.icons} />
                <SearchForm type='doctor' searchPatDocUserCpf={handleCpfSearch} />
                <FormPacDocUserConsult docpatuser='editdoctor' buttons='Editar' searchPatDocUserCpf={searchPatDocUserCpf} />
            </section>
        </main>
    );
};