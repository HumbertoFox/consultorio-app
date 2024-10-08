'use client';
import { GetCrmY } from '@/app/api/getcrms/crmy';
import { GetCrmX } from '@/app/api/getcrms/crmx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faBookMedical, faCalendarCheck, faBedPulse, faBed, faUserDoctor, faUserNurse, faUserPlus, faUserPen, faUserLock } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import styles from './page.module.css';
export default function MenuPage() {
    const [crmy, setCrmy] = useState<string>('N/A');
    const [crmx, setCrmx] = useState<string>('N/A');
    useEffect(() => {
        const fetchCRMs = async () => {
            const crmy = await GetCrmY();
            const crmx = await GetCrmX();
            setCrmy(crmy.toString());
            setCrmx(crmx.toString());
        };
        fetchCRMs();
    }, [])
    return (
        <main className={styles.menu}>
            <div className={styles.divmenu}>
                <h1>Página de Menu</h1>
                <nav className={styles.navmenu}>
                    <div>
                        <Link href={'/'} title='Agenda' aria-label='Agenda'>
                            <FontAwesomeIcon icon={faCalendarCheck} />
                        </Link>
                        <Link href={'/menu/registerpatients'} title='Cadastrar Paciente' aria-label='Cadastrar Paciente'>
                            <FontAwesomeIcon icon={faBed} />
                        </Link>
                    </div>
                    <div>
                        <Link href={'/menu/monthconsultx'} title={`Exibir Consulta do Mês, CRM ${crmx}`} aria-label={`Exibir Consulta do Mês, CRM ${crmx}`}>
                            <FontAwesomeIcon icon={faBookMedical} />
                        </Link>
                        <Link href={'/menu/monthconsulty'} title={`Exibir Consulta do Mês, CRM ${crmy}`} aria-label={`Exibir Consulta do Mês, CRM ${crmy}`}>
                            <FontAwesomeIcon icon={faBookMedical} />
                        </Link>
                    </div>
                    <div>
                        <Link href={'/menu/registeruser'} title='Cadastrar Usuário' aria-label='Cadastrar Usuário'>
                            <FontAwesomeIcon icon={faUserPlus} />
                        </Link>
                        <Link href={'/menu/registerdoctors'} title='Cadastrar Doutor(a)' aria-label='Cadastrar Doutor(a)'>
                            <FontAwesomeIcon icon={faUserDoctor} />
                        </Link>
                    </div>
                    <div>
                        <Link href={'/menu/editdoctors'} title='Editar Doutor(a)' aria-label='Editar Doutor(a)'>
                            <FontAwesomeIcon icon={faUserNurse} className={styles.edit} />
                        </Link>
                        <Link href={'/menu/editpatients'} title='Editar Paciente' aria-label='Editar Paciente'>
                            <FontAwesomeIcon icon={faBedPulse} className={styles.edit} />
                        </Link>
                    </div>
                    <div>
                        <Link href={'/menu/edituser'} title='Editar Usuário' aria-label='Editar Usuário'>
                            <FontAwesomeIcon icon={faUserPen} className={styles.edit} />
                        </Link>
                        <Link href={'/menu/blockeduser'} title='Bloquear Usuário' aria-label='Bloquear Usuário'>
                            <FontAwesomeIcon icon={faUserLock} className={styles.block} />
                        </Link>
                    </div>
                </nav>
            </div>
        </main>
    );
};