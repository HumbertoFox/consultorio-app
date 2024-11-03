import styles from '@/app/consultations/page.module.css';
import TableReport from '@/components/tables';

export default function ReportDoctoryPage() {
    const crmy = Number(process.env.DOCTORY_CRM);
    return (
        <div className={styles.divmain}>
            <TableReport crm={crmy} month={false} />
        </div>
    );
};