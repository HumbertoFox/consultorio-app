'use client';

import { useState } from 'react';
import { InputsRegisterPatientProps } from '@/interfaces/interfaces';
import styles from '@/app/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPacDocUserConsult from '@/components/forms/formfull';

export default function ConsultationyPage() {
    const [searchPatDocUserCpf, setSearchPatDocUserCpf] = useState<InputsRegisterPatientProps | null>(null);
    const handleCpfSearch = (result: InputsRegisterPatientProps) => setSearchPatDocUserCpf(result);

    return (
        <div className={styles.divmain}>
            <SearchForm
                type='patient'
                searchPatDocUserCpf={handleCpfSearch}
            />
            <FormPacDocUserConsult
                doctorcrm='crmy'
                docpatuser='consultation'
                buttons='Agendar'
                searchPatDocUserCpf={searchPatDocUserCpf}
            />
        </div>
    );
};