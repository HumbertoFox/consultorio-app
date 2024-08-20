import styles from '@/app/consultations/page.module.css';
import TableReport from '@/components/tables';

export default function ReportDoctorxPage() {
    return (
        <div className={styles.divmain}>
            <TableReport crm={8185} />
        </div>
    );
};