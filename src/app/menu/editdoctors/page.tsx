'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNurse } from '@fortawesome/free-solid-svg-icons';
import SearchForm from '@/components/forms/formsearch';
import FormPacDocUserConsult from '@/components/forms/formpacdocuserconsult';
import styles from '@/app/menu/page.module.css';
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
};
export default function EditDoctorPage() {
    const [searchPatDocUserCpf, setSearchPatDocUserCpf] = useState<PatDocUserSearchResult | null>(null);
    const handleCpfSearch = (result: PatDocUserSearchResult) => {
        setSearchPatDocUserCpf(result);
    };
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