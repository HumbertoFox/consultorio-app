'use client';
import styles from './event.module.css';

interface CalendarEvent {
    name: string;
    telephone: string;
    covenant: string;
    desc: string;
    observation: string;
    start: Date;
    end: Date;
    title: string;
    [key: string]: any;
    onClose?: () => void;
};

export default function ConsultClick({ name, telephone, covenant, desc, observation, start, end, title, onClose }: CalendarEvent) {

    return (
        <div className={styles.diveventmain}>
            <section>
                <h2>CPF: {title}</h2>
                <h3>Nome: {name}</h3>
                <p>Telefone: {telephone}</p>
                <p>Plano: {covenant}</p>
                <span>CRM: {desc}</span>
                <p>OBS: {observation}</p>
                <p>Início: {start.toLocaleString()}</p>
                <p>Termino: {end.toLocaleString()}</p>
                <button type='button' title='Fechar' onClick={onClose}>Fechar</button>
            </section>
        </div>
    );
};