'use client';
import Link from 'next/link';
import styles from '@/app/page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBedPulse, faUserDoctor, faUserNurse, faUserPlus, faUserPen, faUserXmark } from '@fortawesome/free-solid-svg-icons';

export default function MenuPage() {
    return (
        <div className={styles.divmain}>
            <div className={styles.menu}>
                <h1>Página de Menu</h1>
                <section className={styles.menusection}>
                    <div>
                        <Link href={'/registeruser'} title='Cadastrar Usuário'>
                            <FontAwesomeIcon icon={faUserPlus} />
                        </Link>
                        <Link href={'/registerdoctors'} title='Cadastrar Doutores'>
                            <FontAwesomeIcon icon={faUserDoctor} />
                        </Link>
                    </div>
                    <div>
                        <Link href={'/editdoctors'} title='Editar Doutor(a)'>
                            <FontAwesomeIcon icon={faUserNurse} />
                        </Link>
                        <Link href={'/editpatients'} title='Editar Paciente'>
                            <FontAwesomeIcon icon={faBedPulse} />
                        </Link>
                    </div>
                    <div>
                        <Link href={'/'} title='Editar Usuário'>
                            <FontAwesomeIcon icon={faUserPen} />
                        </Link>
                        <Link href={'/'} title='Excluir Usuário'>
                            <FontAwesomeIcon icon={faUserXmark} />
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
};