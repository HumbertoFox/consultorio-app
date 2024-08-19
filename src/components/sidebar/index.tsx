'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader, faCheck, faNotesMedical, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import Image from 'next/image';
import ImageMedicine from '@/assets/simbolo-de-medicina.png';
import ImageDoctorX from '@/assets/doutorx.png';
import ImageDoctorY from '@/assets/doutory.png';
import styles from './sidebar.module.css';

export default function SideBar() {
    const router = useRouter();
    const [selectBar, setSelectBar] = useState<string>('');
    const handleBarClick = (element: string) => {
        setSelectBar(element);
        localStorage.setItem('activeBarSelection', element);
    };
    useEffect(() => {
        const activeBarSelection = localStorage.getItem('activeBarSelection');
        if (activeBarSelection != null) {
            setSelectBar(activeBarSelection);
            if (activeBarSelection == 'DoctorxConsultation') {
                router.push('/consultations/doctorx');
            } else if (activeBarSelection == 'PatientsDoctorx') {
                router.push('/');
            } else if (activeBarSelection == 'DoctoryConsultation') {
                router.push('/consultations/doctory');
            } else if (activeBarSelection == 'PatientsDoctory') {
                router.push('/');
            };
        } else {
            setSelectBar('Calendar');
            router.push('/');
        };
    }, [router]);

    return (
        <div className={styles.divsidebar}>
            <Link href={'/menu'} onClick={() => handleBarClick('Menu')}>
                <Image src={ImageMedicine} className={styles.imgnedicina} width={150} height={150} alt='Imagem Logo Medicina' priority />
            </Link>
            <nav className={styles.navsidebar}>
                <div className={selectBar == 'Calendar' ? styles.active : ''} onClick={() => handleBarClick('Calendar')}>
                    <Link href={'/'}>
                        <FontAwesomeIcon icon={faBookOpenReader} />
                        <span>Calendario</span>
                    </Link>
                </div>
                <div>
                    <div title='Doutora Marta' className={styles.divimgdoctors}>
                        <Image src={ImageDoctorX} className={styles.icondoctors} width={40} height={40} alt='Icone Doutora' />
                        <span>Doutora Marta</span>
                    </div>
                </div>
                <div className={selectBar == 'DoctorxConsultation' ? styles.active : ''} onClick={() => handleBarClick('DoctorxConsultation')}>
                    <Link href={'/consultations/doctorx'}>
                        <FontAwesomeIcon icon={faNotesMedical} />
                        <span>Agendar Consulta</span>
                    </Link>
                </div>
                <div className={selectBar == 'PatientsDoctorx' ? styles.active : ''} onClick={() => handleBarClick('PatientsDoctorx')}>
                    <Link href={'/'}>
                        <FontAwesomeIcon icon={faCheck} />
                        <span>Listar Pacientes</span>
                    </Link>
                </div>
                <div>
                    <div title='Doutor Sérgio' className={styles.divimgdoctors}>
                        <Image src={ImageDoctorY} className={styles.icondoctors} width={37} height={37} alt='Icone Doutor' />
                        <span>Doutor Sérgio</span>
                    </div>
                </div>
                <div className={selectBar == 'DoctoryConsultation' ? styles.active : ''} onClick={() => handleBarClick('DoctoryConsultation')}>
                    <Link href={'/consultations/doctory'}>
                        <FontAwesomeIcon icon={faNotesMedical} />
                        <span>Agendar Consulta</span>
                    </Link>
                </div>
                <div className={selectBar == 'PatientsDoctory' ? styles.active : ''} onClick={() => handleBarClick('PatientsDoctory')}>
                    <Link href={'/'}>
                        <FontAwesomeIcon icon={faCheck} />
                        <span>Listar Pacientes</span>
                    </Link>
                </div>
                <div>
                    <Link href={'/login'} title='Sair do Sistema'>
                        <FontAwesomeIcon className={styles.iconexit} icon={faArrowRightFromBracket} />
                        <span>Sair do Sistema</span>
                    </Link>
                </div>
            </nav >
        </div >
    );
};