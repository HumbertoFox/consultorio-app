'use client';

import styles from '@/app/page.module.css';
import Icon from '@/components/Icons/Icons';
import Link from 'next/link';
import {
  useEffect,
  useState
} from 'react';

export default function Home() {
  const [videoSrc, setVideoSrc] = useState<string>('/videos/pusasion.mp4');

  useEffect(() => {
    const videos = [
      '/videos/pusasion.mp4',
      '/videos/virus.mp4',
    ];

    const randomIndex = Math.floor(Math.random() * videos.length);
    setVideoSrc(videos[randomIndex]);
  }, []);
  return (
    <div className={styles.divbodyhome}>
      <div className={styles.divopacity}>
        <video
          src={videoSrc}
          loop
          autoPlay
          muted
          playsInline
        />
      </div>
      <div className={styles.divmainhome}>
        <header>
          <Link href='/login'>
            Conecte-se
          </Link>
        </header>
        <main>
          <h1>Seu Sistema de Marcação e Confirmação de Consulta Mais Completo.</h1>
          <h2>Bem-vindo!</h2>
        </main>
        <footer>
          <address>
            <strong>Endereço:</strong><br />
            PE-022, 344-Box-B,<br />
            Nossa senhora da Conceição, Paulista-PE.<br />
            Paulista, 53.421-420, BR.<br />
            Contato: 81 98807-5408 - WhatsApp.<br />
            E-Mail: betofoxnettelecom@gmail.com.<br />
          </address>
          <div className={styles.divsocial}>
            <h5><strong>Redes Sociais</strong></h5>
            <div>
              <Link
                href=''
                className={styles.instagran}
              >
                <Icon icon='fa-brands fa-instagram' />
              </Link>
              <Link
                href=''
                className={styles.twitter}
              >
                <Icon icon='fa-brands fa-x-twitter' />
              </Link>
              <Link
                href=''
                className={styles.facebook}
              >
                <Icon icon='fa-brands fa-facebook-f' />
              </Link>
              <Link
                href=''
                className={styles.whatsapp}
              >
                <Icon icon='fa-brands fa-whatsapp' />
              </Link>
              <Link
                href=''
                className={styles.phone}
              >
                <Icon icon='fa-solid fa-phone' />
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}