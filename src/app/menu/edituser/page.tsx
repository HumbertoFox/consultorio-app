'use client';
import styles from '@/app/menu/page.module.css';
import SearchForm from '@/components/forms/formsearch';
import FormPatDocUser from '@/components/forms/formpatdocuser';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPen } from '@fortawesome/free-solid-svg-icons';

interface PatDocUserSearchResult {
    crm?: number;
    cpf?: number;
    name?: string;
    dateofbirth?: string;
    telephone?: string;
    email?: string;
    password?: string;
    zipcode?: number;
    street?: string;
    district?: string;
    city?: string;
    residencenumber?: string;
    building?: string;
    buildingblock?: string;
    apartment?: string;
}

export default function EditUserPage() {
    const [searchPatDocUserCpf, setSearchPatDocUserCpf] = useState<PatDocUserSearchResult | null>(null);
    const handleCpfSearch = (result: PatDocUserSearchResult) => {
        setSearchPatDocUserCpf(result);
    };
    return (
        <main className={styles.mainmenu}>
            <h1>Editar Usuário</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faUserPen} className={styles.icons} />
                <SearchForm type='user' searchPatDocUserCpf={handleCpfSearch} />
                <FormPatDocUser docpatuser='user' buttons='Editar' searchPatDocUserCpf={searchPatDocUserCpf} />
            </section>
        </main>
    );
};