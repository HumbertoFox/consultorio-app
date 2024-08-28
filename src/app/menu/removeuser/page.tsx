'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserXmark } from '@fortawesome/free-solid-svg-icons';
import SearchForm from '@/components/forms/formsearch';
import FormPacDocUserConsult from '@/components/forms/formpacdocuserconsult';
import styles from '@/app/menu/page.module.css';

interface PatDocUserSearchResult {
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

export default function RemoveUserPage() {
    const [searchPatDocUserCpf, setSearchPatDocUserCpf] = useState<PatDocUserSearchResult | null>(null);
    const handleCpfSearch = (result: PatDocUserSearchResult) => {
        setSearchPatDocUserCpf(result);
    };

    return (
        <main className={styles.mainmenu}>
            <h1>Deletar Usuário</h1>
            <section className={styles.menusection}>
                <FontAwesomeIcon icon={faUserXmark} className={styles.icons} />
                <SearchForm type='user' searchPatDocUserCpf={handleCpfSearch} />
                <FormPacDocUserConsult docpatuser='removeuser' buttons='Remover' searchPatDocUserCpf={searchPatDocUserCpf} />
            </section>
        </main>
    );
};