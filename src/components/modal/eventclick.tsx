'use client';
import { useState } from 'react';
import { EventMessageProps } from '@/interfaces/interfaces';
import styles from './event.module.css';
export default function EventClick({ message, Error, title, onClose }: EventMessageProps) {
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
                <h2 className={Error == true ? styles.sectionerror : ''}>{Error == true ? 'Error' : 'Sucesso'}</h2>
                <span>{message}</span>
                {title !== 'Fechar Login' && <button type='button' title={title} onClick={handleClose}>Fechar</button>}
            </section>
        </div>
    );
};