import styles from '@/app/consultations/page.module.css';
import TableReport from '@/components/tables';

export default function ReportDoctorxPage() {
    const crmx = Number(process.env.DOCTORX_CRM);
    return (
        <div className={styles.divmain}>
            <TableReport
                crm={crmx}
                month={false}
            />
        </div>
    );
}