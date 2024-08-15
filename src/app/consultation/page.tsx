import styles from '@/app/page.module.css';
import FormConsultation from '@/components/forms/formconsultation';

export default function ConsultationPage() {
    return (
        <div className={styles.divmainforms}>
            <FormConsultation />
        </div>
    );
};