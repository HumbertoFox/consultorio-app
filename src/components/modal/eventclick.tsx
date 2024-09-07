'use client';
import { useState } from 'react';
import styles from './event.module.css';
interface EventMessage {
    message?: string;
    Error: boolean;
    title?: string;
    onClose?: () => void;
};
export default function EventClick({ message, Error, title, onClose }: EventMessage) {
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