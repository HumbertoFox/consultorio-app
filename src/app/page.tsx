import styles from '@/app/page.module.css';
import VideoComponent from '@/components/animationhome';
import Link from 'next/link';
import { cookies } from 'next/headers';
import FooterComponent from '@/components/footer';

export default async function Home() {
  const sessionCookies = (await cookies()).get('sessionAuthToken');

  return (
    <div className={styles.divbodyhome}>
      <div className={styles.divopacity}>
        <VideoComponent />
      </div>
      <div className={styles.divmainhome}>
        <header>
          {sessionCookies ? (
            <Link href='/agenda'>
              Agenda
            </Link>
          ) : (
            <Link href='/login'>
              Conecte-se
            </Link>
          )}
        </header>
        <main>
          <h1>Seu Sistema de Marcação e Confirmação de Consulta Mais Completo.</h1>
          <h2>Bem-vindo!</h2>
        </main>
        <FooterComponent />
      </div>
    </div>
  );
}