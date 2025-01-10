'use client';

import { GetCrmY } from '@/app/api/getcrms/crmy';
import { GetCrmX } from '@/app/api/getcrms/crmx';
import { MenuItem } from '@/interfaces/interfaces';
import {
    useEffect,
    useState
} from 'react';
import Icon from '@/components/Icons/Icons';
import Link from 'next/link';
import styles from './page.module.css';

const menuItems: MenuItem[][] = [
    [
        { href: '/', title: 'Agenda', icon: 'fa-regular fa-calendar-check' },
        { href: '/menu/registerpatients', title: 'Cadastrar Paciente', icon: 'fa-solid fa-hospital-user', rotate: true },
    ],
    [
        { href: '/menu/monthconsultx', title: 'Exibir Consulta do Mês, CRM {crmX}', icon: 'fa-solid fa-virus' },
        { href: '/menu/monthconsulty', title: 'Exibir Consulta do Mês, CRM {crmY}', icon: 'fa-solid fa-heart-pulse' },
    ],
    [
        { href: '/menu/registeruser', title: 'Cadastrar Usuário', icon: 'fa-solid fa-user-plus' },
        { href: '/menu/registerdoctors', title: 'Cadastrar Doutor(a)', icon: 'fa-solid fa-user-doctor', rotate: true },
    ],
    [
        { href: '/menu/editdoctors', title: 'Editar Doutor(a)', icon: 'fa-solid fa-user-doctor', edit: true },
        { href: '/menu/editpatients', title: 'Editar Paciente', icon: 'fa-solid fa-hospital-user', edit: true },
    ],
    [
        { href: '/menu/edituser', title: 'Editar Usuário', icon: 'fa-solid fa-user-pen', edit: true },
        { href: '/menu/blockeduser', title: 'Bloquear Usuário', icon: 'fa-solid fa-user-lock', block: true },
    ],
];

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
    }, []);
    return (
        <main className={styles.menu}>
            <div className={styles.divmenu}>
                <h1>Página de Menu</h1>

                <nav className={styles.navmenu}>
                    {menuItems.map((group, index) => (
                        <div key={index}>
                            {group.map(({
                                href,
                                title,
                                icon,
                                rotate,
                                edit,
                                block
                            }) => (
                                <Link
                                    key={title}
                                    href={href}
                                    title={title.replace('{crmX}', crmx).replace('{crmY}', crmy)}
                                    aria-label={title.replace('{crmX}', crmx).replace('{crmY}', crmy)}
                                >
                                    <Icon
                                        icon={icon}
                                        className={rotate
                                            ? styles.rotatyicon
                                            : edit
                                                ? styles.edit
                                                : block
                                                    ? styles.block
                                                    : ''
                                        }
                                    />
                                </Link>
                            ))}
                        </div>
                    ))}
                </nav>
            </div>
        </main>
    );
}