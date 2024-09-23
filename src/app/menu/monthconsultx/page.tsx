'use client';
import Link from 'next/link';
import styles from '@/app/menu/page.module.css';
import TableReport from '@/components/tables';
const CurrentMonth = new Date();
export default function ReportListXMonth() {
    const crmx = Number(process.env.DOCTORX_CRM);
    return (
        <table className={styles.tableconsults}>
            <thead className={styles.thead}>
                <tr>
                    <th>Lista de Consulta</th>
                </tr>
                <tr>
                    <th>{`Mês ${CurrentMonth.getMonth() + 1}`}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><TableReport crm={crmx} month={true} /></td>
                </tr>
                <tr>
                    <td className={styles.tdbutton}><Link href={'/menu'} className={`${styles['no-print']}`}>Menu</Link></td>
                </tr>
            </tbody>
        </table>
    );
};