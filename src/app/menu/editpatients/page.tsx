'use client';
import styles from '@/app/menu/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPatDocUser from '@/components/forms/formpatdocuser';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBedPulse } from '@fortawesome/free-solid-svg-icons';

interface PatientSearchResult {
    cpf?: number;
    name?: string;
    dateofbirth?: string;
    telephone?: string;
    email?: string;
    zipcode?: number;
    street?: string;
    district?: string;
    city?: string;
    residencenumber?: string;
    building?: string;
    buildingblock?: string;
    apartment?: string;
}

export default function EditPatientsPage() {
    const [searchPatientCpf, setSearchPatientCpf] = useState<PatientSearchResult | null>(null);
    const handleCpfSearch = (result: PatientSearchResult) => {
        setSearchPatientCpf(result);
    };

    return (
        <main className={styles.mainmenu}>
            <h1>Editar Paciente</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faBedPulse} className={styles.icons} />
                <SearchForm type='patient' searchPatientCpf={handleCpfSearch} />
                <FormPatDocUser docpatuser='patient' buttons='Editar' searchPatientCpf={searchPatientCpf} />
            </section>
        </main>
    );
};