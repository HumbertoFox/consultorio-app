import styles from '@/app/page.module.css';
import FormConsultation from '@/components/forms/formconsultation';

export default function ConsultationyPage() {
    return (
        <div className={styles.divmainforms}>
            <FormConsultation crm={6733} />
        </div>
    );
};