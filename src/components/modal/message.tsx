import styles from './page.module.css';

export default function ModalMessage() {
    return (
        <section className={styles.message}>
            <div className={styles.divmessage}>
                <span></span>
                <p></p>
                <button type='button'>Fechar</button>
            </div>
        </section>
    );
};