'use client';

import Icon from '@/components/Icons/Icons';
import Image from 'next/image';
import styles from '@/app/page.module.css';
import FormLogin from '@/components/forms/login';
import ImageMedicine from '@/assets/simbolo-de-medicina.png';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <main className={styles.mainmenu}>
            <div className={styles.login}>
                <h1>Usuário do Sistema</h1>
                <section className={styles.loginsection}>
                    <Link href='/'>
                        <Image src={ImageMedicine}
                            className={styles.imgnedicina}
                            width={110}
                            height={110}
                            alt='Imagem Logo Medicina'
                            rel='preload'
                            priority
                        />
                    </Link>
                    <Icon
                        icon={'fa-solid fa-house-medical-circle-check'}
                        className={styles.iconlogin}
                    />
                    <FormLogin />
                </section>
            </div>
        </main>
    );
}