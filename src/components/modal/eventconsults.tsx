'use client';
import { useState } from 'react';
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
    status: string;
    [key: string]: any;
    onClose?: () => void;
};
export default function ConsultClick({ name, telephone, covenant, desc, observation, start, end, title, status, onClose }: CalendarEvent) {
    const [isClosing, setIsClosing] = useState<boolean>(false);
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose && onClose();
        }, 400);
    };
    return (
        <div className={styles.diveventmain}>
            <section className={isClosing ? styles.sectionUp : styles.sectionDown}>
                <h3><strong>Status:</strong> {status}</h3>
                <h4><strong>CPF:</strong> {title}</h4>
                <h5><strong>Nome:</strong> {name}</h5>
                <p><strong>Telefone:</strong> {telephone}</p>
                <p><strong>Plano:</strong> {covenant}</p>
                <span><strong>CRM:</strong> {desc}</span>
                <p><strong>OBS:</strong> {observation}</p>
                <p><strong>Início:</strong> {start.toLocaleString()}</p>
                <p><strong>Termino:</strong> {end.toLocaleString()}</p>
                <button type='button' title='Fechar' onClick={handleClose}>Fechar</button>
            </section>
        </div>
    );
};