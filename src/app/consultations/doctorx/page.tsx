'use client';
import { useState } from 'react';
import styles from '@/app/page.module.css';
import FormPacDocUserConsult from '@/components/forms/formpacdocuserconsult';
import SearchForm from '@/components/forms/formsearch';

interface PatDocUserSearchResult {
    crm?: number;
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

export default function ConsultationxPage() {
    const [searchPatDocUserCpf, setSearchPatDocUserCpf] = useState<PatDocUserSearchResult | null>(null);
    const handleCpfSearch = (result: PatDocUserSearchResult) => {
        setSearchPatDocUserCpf(result);
    };

    return (
        <div className={styles.divmain}>
            <SearchForm type='doctor' searchPatDocUserCpf={handleCpfSearch} />
            <FormPacDocUserConsult crm={8185} docpatuser='consultation' buttons='Agendar' searchPatDocUserCpf={searchPatDocUserCpf} />
        </div>
    );
};