import styles from '@/app/page.module.css';
import FormLogin from '@/components/forms/login';
import Image from 'next/image';
import ImageMedicine from '@/assets/simbolo-de-medicina.png';

export default function LoginPage() {
    return (
        <div className={styles.divmain}>
            <div className={styles.login}>
                <section className={styles.loginsection}>
                    <h1>Usuário do Sistema</h1>
                    <Image src={ImageMedicine} className={styles.imgnedicina} width={150} height={150} alt='Imagem Logo Medicina' priority />
                    <FormLogin />
                </section>
            </div>
        </div>
    );
};