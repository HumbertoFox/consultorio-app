import styles from '@/app/page.module.css';
import FormLogin from '@/components/forms/login';
import Image from 'next/image';
import ImageMedicine from '@/assets/simbolo-de-medicina.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLock } from '@fortawesome/free-solid-svg-icons';

export default function LoginPage() {
    return (
        <main className={styles.mainmenu}>
            <div className={styles.login}>
                <h1>Usuário do Sistema</h1>
                <section className={styles.loginsection}>
                    <Image src={ImageMedicine} className={styles.imgnedicina} width={110} height={110} alt='Imagem Logo Medicina' priority />
                    <FontAwesomeIcon icon={faUserLock} className={styles.iconlogin} />
                    <FormLogin />
                </section>
            </div>
        </main>
    );
};