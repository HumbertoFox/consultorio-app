import styles from '@/app/consultations/page.module.css';
import TableReport from '@/components/tables';
export default function ReportDoctoryPage() {
    return (
        <div className={styles.divmain}>
            <TableReport crm={6733} month={false} />
        </div>
    );
};