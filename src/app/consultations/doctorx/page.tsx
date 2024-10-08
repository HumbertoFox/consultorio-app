'use client';
import { GetCrmX } from '@/app/api/getcrms/crmx';
import { useEffect, useState } from 'react';
import { InputsRegisterPatientProps } from '@/interfaces/interfaces';
import styles from '@/app/page.module.css';
import FormPacDocUserConsult from '@/components/forms/formpacdocuserconsult';
import SearchForm from '@/components/forms/formsearch';
export default function ConsultationxPage() {
    const [crmx, setCrmx] = useState<number>(0);
    const [searchPatDocUserCpf, setSearchPatDocUserCpf] = useState<InputsRegisterPatientProps | null>(null);
    const handleCpfSearch = (result: InputsRegisterPatientProps) => {
        setSearchPatDocUserCpf(result);
    };
    useEffect(() => {
        const fetchCRMX = async () => {
            const crmx = await GetCrmX();
            setCrmx(crmx);
        };
        fetchCRMX();
    }, []);
    return (
        <div className={styles.divmain}>
            <SearchForm type='patient' searchPatDocUserCpf={handleCpfSearch} />
            <FormPacDocUserConsult crm={crmx} docpatuser='consultation' buttons='Agendar' searchPatDocUserCpf={searchPatDocUserCpf} />
        </div>
    );
};