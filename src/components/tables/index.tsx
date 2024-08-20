import styles from './table.module.css';

interface CrmDoctor {
    crm: number;
};

export default function TableReport({ crm }: CrmDoctor) {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>Cód. Con.</th>
                    <th>CRM</th>
                    <th>CPF</th>
                    <th>Nome</th>
                    <th>Covênio</th>
                    <th>Horário e Data</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    );
};