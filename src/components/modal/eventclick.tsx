'use client';
import styles from './event.module.css';

interface EventMessage {
    message?: string;
    Error: boolean;
    title?: string;
    onClose?: () => void;
};

export default function EventClick({ message, Error, title, onClose }: EventMessage) {

    return (
        <div className={styles.diveventmain}>
            <section className={Error == true ? styles.sectionerror : ''}>
                <h2>{Error == true ? 'Error' : 'Sucesso'}</h2>
                <span>{message}</span>
                {Error === true && title !== 'Fechar Login' && <button type='button' title={title} onClick={onClose}>Fechar</button>}
            </section>
        </div>
    );
};