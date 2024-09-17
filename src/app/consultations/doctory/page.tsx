'use client';
import { useState } from 'react';
import { InputsRegisterPatientProps } from '@/interfaces/interfaces';
import styles from '@/app/page.module.css';
import FormPacDocUserConsult from '@/components/forms/formpacdocuserconsult';
import SearchForm from '@/components/forms/formsearch';
export default function ConsultationyPage() {
    const [searchPatDocUserCpf, setSearchPatDocUserCpf] = useState<InputsRegisterPatientProps | null>(null);
    const handleCpfSearch = (result: InputsRegisterPatientProps) => {
        setSearchPatDocUserCpf(result);
    };
    return (
        <div className={styles.divmain}>
            <SearchForm type='patient' searchPatDocUserCpf={handleCpfSearch} />
            <FormPacDocUserConsult crm={6733} docpatuser='consultation' buttons='Agendar' searchPatDocUserCpf={searchPatDocUserCpf} />
        </div>
    );
};