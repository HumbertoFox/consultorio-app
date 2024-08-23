'use client';
import { useEffect, useState } from 'react';
import styles from './table.module.css';
import { SearchConsults } from '@/app/api/consultation/reqconsultation';

type Consult = {
    id?: number;
    crm?: number;
    cpf?: string;
    name?: string;
    covenant?: string;
    start?: string;
}

interface CrmDoctor {
    crm: number;
};

export default function TableReport({ crm }: CrmDoctor) {
    const [consults, setConsults] = useState<Consult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getConsults = async () => {
            try {
                const response = await SearchConsults(crm.toString());
                const resArray = Object.values(response);
                const consultArray = resArray[3];
                for (const key in consultArray) {
                    consultArray[key].cpf = consultArray[key].cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                    let dateTimeParts = consultArray[key].start.split('-');
                    let dateParts = dateTimeParts[2].split('T');
                    consultArray[key].start = `${dateParts[1]} ${dateParts[0]}/${dateTimeParts[1]}/${dateTimeParts[0]}`;
                };
                consultArray.sort((a: any, b: any) => b.id - a.id);
                setConsults(consultArray);
            } catch (Error) {
                console.error({
                    Error: true,
                    message: 'Erro ao Conectar ao Banco !'
                });
            } finally {
                setLoading(false);
            }
        };

        getConsults();
    }, [crm]);

    if (loading) {
        return <div>Carregando...</div>;
    };

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
                {consults.map((consul: any) => (
                    <tr key={consul.id}>
                        <td>{consul.id}</td>
                        <td>{consul.crm}</td>
                        <td>{consul.cpf}</td>
                        <td>{consul.name}</td>
                        <td>{consul.covenant}</td>
                        <td>{consul.start}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};