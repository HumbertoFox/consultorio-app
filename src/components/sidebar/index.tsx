'use client';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faBookOpenReader, faCheck, faNotesMedical, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import styles from './sidebar.module.css';
import ImageMedicine from '@/assets/simbolo-de-medicina.png';
import ImageDoctorX from '@/assets/doutorx.png';
import ImageDoctorY from '@/assets/doutory.png';
import { destroySession } from '@/app/api/modules/actions/removecookies';
export default function SideBar() {
    const router = useRouter();
    const [selectBar, setSelectBar] = useState<string>('');
    const handleBarClick = (element: string) => {
        setSelectBar(element);
        localStorage.setItem('activeBarSelection', element);
    };
    const handleLogout = async () => {
        await destroySession();
    };
    useEffect(() => {
        const activeBarSelection = localStorage.getItem('activeBarSelection');
        if (activeBarSelection != null) {
            setSelectBar(activeBarSelection);
            if (activeBarSelection == 'DoctorxConsultation') {
                router.push('/consultations/doctorx');
            } else if (activeBarSelection == 'PatientsDoctorx') {
                router.push('/consultations/reportx');
            } else if (activeBarSelection == 'DoctoryConsultation') {
                router.push('/consultations/doctory');
            } else if (activeBarSelection == 'PatientsDoctory') {
                router.push('/consultations/reporty');
            };
        } else {
            setSelectBar('Calendar');
            router.push('/');
        };
    }, [router]);
    return (
        <div className={`${styles.divsidebar} ${styles['no-print']}`}>
            <Link href={'/menu'} title='Menu' onClick={() => handleBarClick('Menu')}>
                <Image src={ImageMedicine} className={styles.imgnedicina} width={150} height={150} alt='Imagem Logo Medicina' priority />
            </Link>
            <nav className={styles.navsidebar}>
                <button title='Agenda de Pacientes Confirmados' type='button' className={selectBar == 'Calendar' ? styles.active : ''} onClick={() => handleBarClick('Calendar')}>
                    <Link href={'/'}>
                        <FontAwesomeIcon icon={faBookOpenReader} />
                        <span>Calendario</span>
                    </Link>
                </button>
                <div title='Doutora Marta'>
                    <div className={styles.divimgdoctors}>
                        <Image src={ImageDoctorX} className={styles.icondoctors} width={40} height={40} alt='Icone Doutora' />
                        <span>Doutora Marta</span>
                    </div>
                </div>
                <button type='button' title='Agendar Consulta para Doutora' className={selectBar == 'DoctorxConsultation' ? styles.active : ''} onClick={() => handleBarClick('DoctorxConsultation')}>
                    <Link href={'/consultations/doctorx'}>
                        <FontAwesomeIcon icon={faNotesMedical} />
                        <span>Agendar Consulta</span>
                    </Link>
                </button>
                <button type='button' title='Lista de Pacientes do Dia Doutora' className={selectBar == 'PatientsDoctorx' ? styles.active : ''} onClick={() => handleBarClick('PatientsDoctorx')}>
                    <Link href={'/consultations/reportx'}>
                        <FontAwesomeIcon icon={faCheck} />
                        <span>Listar Pacientes</span>
                    </Link>
                </button>
                <div title='Doutor Sérgio'>
                    <div className={styles.divimgdoctors}>
                        <Image src={ImageDoctorY} className={styles.icondoctors} width={37} height={37} alt='Icone Doutor' />
                        <span>Doutor Sérgio</span>
                    </div>
                </div>
                <button type='button' title='Agendar Consulta para Doutor' className={selectBar == 'DoctoryConsultation' ? styles.active : ''} onClick={() => handleBarClick('DoctoryConsultation')}>
                    <Link href={'/consultations/doctory'}>
                        <FontAwesomeIcon icon={faNotesMedical} />
                        <span>Agendar Consulta</span>
                    </Link>
                </button>
                <button type='button' title='Lista de Pacientes do Dia Doutor' className={selectBar == 'PatientsDoctory' ? styles.active : ''} onClick={() => handleBarClick('PatientsDoctory')}>
                    <Link href={'/consultations/reporty'}>
                        <FontAwesomeIcon icon={faCheck} />
                        <span>Listar Pacientes</span>
                    </Link>
                </button>
                <button type='button' title='Sair do Sistema' className={styles.exitbutton} onClick={handleLogout}>
                    <FontAwesomeIcon className={styles.iconexit} icon={faArrowRightFromBracket} />
                    <span>Sair do Sistema</span>
                </button>
            </nav >
        </div >
    );
};