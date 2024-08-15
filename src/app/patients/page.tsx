import FormPatDoc from '@/components/forms/formpatdoc';
import styles from '@/app/page.module.css';

export default function PatientsPage() {
    return (
        <div className={styles.divmainforms}>
            <FormPatDoc />
        </div>
    );
};