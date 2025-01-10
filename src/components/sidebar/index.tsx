'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './sidebar.module.css';
import ImageMedicine from '@/assets/simbolo-de-medicina.png';
import ImageDoctorX from '@/assets/doutorx.png';
import ImageDoctorY from '@/assets/doutory.png';
import Icon from '@/components/Icons/Icons';

export default function SideBar() {
    const pathname = usePathname();

    return (
        <div className={`${styles.divsidebar} ${styles['no-print']}`}>
            <Link
                href={'/menu'}
                title='Menu'
            >
                <Image
                    src={ImageMedicine}
                    className={styles.imgnedicina}
                    width={150}
                    height={150}
                    alt='Imagem Logo Medicina'
                    priority
                />
            </Link>
            <nav className={styles.navsidebar}>
                <button
                    title='Agenda de Pacientes Confirmados'
                    type='button'
                    className={pathname === '/'
                        ? styles.active :
                        ''}
                >
                    <Link href={'/'}>
                        <Icon icon={'fa-regular fa-calendar-check'} />
                        <span>Calendario</span>
                    </Link>
                </button>

                <div title='Doutora Marta'>
                    <div className={styles.divimgdoctors}>
                        <Image
                            src={ImageDoctorX}
                            className={styles.icondoctors}
                            width={40}
                            height={40}
                            alt='Icone Doutora'
                        />
                        <span>Doutora Marta</span>
                    </div>
                </div>

                <button
                    type='button'
                    title='Agendar Consulta para Doutora'
                    className={pathname === '/consultations/doctorx'
                        ? styles.active :
                        ''}
                >
                    <Link href={'/consultations/doctorx'}>
                        <Icon icon={'fa-solid fa-notes-medical'} />
                        <span>Agendar Consulta</span>
                    </Link>
                </button>

                <button
                    type='button'
                    title='Lista de Pacientes do Dia Doutora'
                    className={pathname === '/consultations/reportx'
                        ? styles.active
                        : ''}
                >
                    <Link href={'/consultations/reportx'}>
                        <Icon icon={'fa-solid fa-virus'} />
                        <span>Listar Pacientes</span>
                    </Link>
                </button>

                <div title='Doutor Sérgio'>
                    <div className={styles.divimgdoctors}>
                        <Image
                            src={ImageDoctorY}
                            className={styles.icondoctors}
                            width={37}
                            height={37}
                            alt='Icone Doutor'
                        />
                        <span>Doutor Sérgio</span>
                    </div>
                </div>

                <button
                    type='button'
                    title='Agendar Consulta para Doutor'
                    className={pathname === '/consultations/doctory'
                        ? styles.active
                        : ''}
                >
                    <Link href={'/consultations/doctory'}>
                        <Icon icon={'fa-solid fa-notes-medical'} />
                        <span>Agendar Consulta</span>
                    </Link>
                </button>

                <button
                    type='button'
                    title='Lista de Pacientes do Dia Doutor'
                    className={pathname === '/consultations/reporty'
                        ? styles.active
                        : ''}
                >
                    <Link href={'/consultations/reporty'}>
                        <Icon icon={'fa-solid fa-heart-pulse'} />
                        <span>Listar Pacientes</span>
                    </Link>
                </button>

                <button
                    type='button'
                    title='Sair do Sistema'
                    className={styles.exitbutton}
                >
                    <Link href={'/logout'}>
                        <Icon
                            className={styles.iconexit}
                            icon={'fa-solid fa-right-from-bracket'}
                        />
                        <span>Sair do Sistema</span>
                    </Link>
                </button>
            </nav >
        </div >
    );
}