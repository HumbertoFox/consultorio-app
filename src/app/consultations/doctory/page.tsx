'use client';
import { GetCrmY } from '@/app/api/getcrms/crmy';
import { useEffect, useState } from 'react';
import { InputsRegisterPatientProps } from '@/interfaces/interfaces';
import styles from '@/app/page.module.css';
import FormPacDocUserConsult from '@/components/forms/formpacdocuserconsult';
import SearchForm from '@/components/forms/formsearch';
export default function ConsultationyPage() {
    const [crmy, setCrmy] = useState<number>(0);
    const [searchPatDocUserCpf, setSearchPatDocUserCpf] = useState<InputsRegisterPatientProps | null>(null);
    const handleCpfSearch = (result: InputsRegisterPatientProps) => {
        setSearchPatDocUserCpf(result);
    };
    useEffect(() => {
        const fetchCRMY = async () => {
            const crmy = await GetCrmY();
            setCrmy(crmy);
        };
        fetchCRMY();
    }, []);
    return (
        <div className={styles.divmain}>
            <SearchForm type='patient' searchPatDocUserCpf={handleCpfSearch} />
            <FormPacDocUserConsult crm={crmy} docpatuser='consultation' buttons='Agendar' searchPatDocUserCpf={searchPatDocUserCpf} />
        </div>
    );
};