'use client';
import { useEffect, useState } from 'react';
import { SearchConsults } from '@/app/api/consultation/reqconsultation';
import { UpdateConsultationStatus } from '@/app/api/consultation/reqconsultationstatus';
import ReactLoading from 'react-loading';
import styles from './table.module.css';
type Consult = {
    id?: number;
    crm?: number;
    cpf?: string;
    name?: string;
    covenant?: string;
    start?: string;
    status?: string;
}
interface CrmDoctor {
    crm: number;
};
export default function TableReport({ crm }: CrmDoctor) {
    const [consults, setConsults] = useState<Consult[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
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
                    message: 'Erro ao Conectar ao Banco!'
                });
            } finally {
                setLoading(false);
            };
        };
        getConsults();
    }, [crm]);
    const handleStatusChange = async (consultId: number, newStatus: string) => {
        try {
            await UpdateConsultationStatus(consultId, newStatus);
            setConsults(prevConsults =>
                prevConsults.map(consult =>
                    consult.id === consultId ? { ...consult, status: newStatus } : consult
                )
            );
        } catch (error) {
            console.error('Erro ao atualizar o status:', error);
        };
    };
    const getStatusClass = (status: string) => {
        if (status === 'Confirmada') return styles.confirmed;
        if (status === 'Cancelada') return styles.cancel;
        if (status === 'Atendido') return styles.serviced;
        return styles.confirm;
    };
    if (loading) {
        return <div className={styles.loading}><ReactLoading type='spin' color='#3C91E6' height={100} width={100} /></div>;
    };
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th title='Código da consulta'>Cód.</th>
                    <th title='CRM do Médico'>CRM</th>
                    <th title='CPF do Paciente'>CPF</th>
                    <th title='Nome do Paciente'>Nome</th>
                    <th title='Convênio do Paciente'>Covênio</th>
                    <th title='Horário e Data da consulta'>H/D</th>
                    <th title='Status da Consulta'>Status</th>
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
                        <td>
                            <select title='Status'
                                value={consul.status}
                                onChange={(element) => handleStatusChange(consul.id, element.target.value)}
                                className={getStatusClass(consul.status)}
                            >
                                <option value='Confirmar' className={styles.confirm}>Confirmar</option>
                                <option value='Confirmada' className={styles.confirmed}>Confirmada</option>
                                <option value='Cancelada' className={styles.cancel}>Cancelada</option>
                                <option value='Atendido' className={styles.serviced}>Atendido</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};