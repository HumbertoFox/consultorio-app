import styles from '@/app/page.module.css';
import FormConsultation from '@/components/forms/formconsultation';

export default function ConsultationxPage() {
    return (
        <div className={styles.divmain}>
            <FormConsultation crm={8185} />
        </div>
    );
};