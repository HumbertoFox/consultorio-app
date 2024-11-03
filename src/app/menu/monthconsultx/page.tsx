import Link from 'next/link';
import moment from 'moment';
import styles from '@/app/menu/page.module.css';
import TableReport from '@/components/tables';
import 'moment/locale/pt-br';
const CurrentMonth = moment();

export default function ReportListXMonth() {
    const crmx = Number(process.env.DOCTORX_CRM);
    const monthName = CurrentMonth.format('MMMM');
    
    return (
        <table className={styles.tableconsults}>
            <thead className={styles.thead}>
                <tr>
                    <th>Lista de Consulta</th>
                </tr>
                <tr>
                    <th>
                        {`Mês de ${monthName.charAt(0).toLocaleUpperCase() + monthName.slice(1)}`}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <TableReport crm={crmx} month={true} />
                    </td>
                </tr>
                <tr>
                    <td className={styles.tdbutton}>
                        <Link href={'/menu'} className={`${styles['no-print']}`}>Menu</Link>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};