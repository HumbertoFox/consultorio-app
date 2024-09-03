'use client';
import Link from 'next/link';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faBedPulse, faBed, faUserDoctor, faUserNurse, faUserPlus, faUserPen, faUserLock } from '@fortawesome/free-solid-svg-icons';

export default function MenuPage() {
    return (
        <main className={styles.menu}>
            <div className={styles.divmenu}>
                <h1>Página de Menu</h1>
                <nav className={styles.navmenu}>
                    <div>
                        <Link href={'/'} title='Agenda'>
                            <FontAwesomeIcon icon={faCalendarCheck} />
                        </Link>
                        <Link href={'/menu/registerpatients'} title='Cadastrar Paciente'>
                            <FontAwesomeIcon icon={faBed} />
                        </Link>
                    </div>
                    <div>
                        <Link href={'/menu/registeruser'} title='Cadastrar Usuário'>
                            <FontAwesomeIcon icon={faUserPlus} />
                        </Link>
                        <Link href={'/menu/registerdoctors'} title='Cadastrar Doutor(a)'>
                            <FontAwesomeIcon icon={faUserDoctor} />
                        </Link>
                    </div>
                    <div>
                        <Link href={'/menu/editdoctors'} title='Editar Doutor(a)'>
                            <FontAwesomeIcon icon={faUserNurse} />
                        </Link>
                        <Link href={'/menu/editpatients'} title='Editar Paciente'>
                            <FontAwesomeIcon icon={faBedPulse} />
                        </Link>
                    </div>
                    <div>
                        <Link href={'/menu/edituser'} title='Editar Usuário'>
                            <FontAwesomeIcon icon={faUserPen} />
                        </Link>
                        <Link href={'/menu/blockeduser'} title='Bloquear Usuário'>
                            <FontAwesomeIcon icon={faUserLock} />
                        </Link>
                    </div>
                </nav>
            </div>
        </main>
    );
};