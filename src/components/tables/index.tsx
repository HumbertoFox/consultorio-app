'use client';

import { DNA } from 'react-loader-spinner';
import { SearchConsults } from '@/app/api/consultation/reqconsultation';
import { useEffect, useState } from 'react';
import { SearchConsultsMonth } from '@/app/api/consultation/reqconsultationmonth';
import { UpdateConsultationStatus } from '@/app/api/consultation/reqconsultationstatus';
import { ConsultProps, CrmDoctorConsultProps } from '@/interfaces/interfaces';
import Icon from '../Icons/Icons';
import styles from './table.module.css';

export default function TableReport({ crm, month }: CrmDoctorConsultProps) {
    const [consults, setConsults] = useState<ConsultProps[]>([]);
    const [notConsults, setNotConsults] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getConsults = async () => {
            try {
                let response;
                if (month) {
                    response = await SearchConsultsMonth(crm.toString());
                } else {
                    response = await SearchConsults(crm.toString());
                };
                const resArray = Object.values(response);
                if (resArray[0] === 204) {
                    return setNotConsults(resArray[2]);
                };
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
    }, [crm, month]);

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
    const handlePrint = () => window.print();

    if (loading) {
        return (
            <div className={styles.loading}>
                <DNA
                    visible={true}
                    height='100'
                    width='100'
                    ariaLabel='dna-loading'
                    wrapperStyle={{}}
                    wrapperClass='dna-wrapper'
                />
            </div>
        );
    };

    return (
        <table className={`${styles.table} ${styles['print-content']}`}>
            <thead>
                <tr>
                    <th title='Código da consulta'>Cód.</th>
                    <th title='CRM do Médico'>CRM</th>
                    <th title='CPF do Paciente'>CPF</th>
                    <th title='Nome do Paciente'>Nome</th>
                    <th title='Convênio do Paciente'>Covênio</th>
                    <th title='Horário e Data da consulta'>H/D</th>
                    <th title='Status da Consulta'>Status</th>
                    <th title='Volta/Retorno'>Retorno</th>
                </tr>
            </thead>
            <tbody>
                {notConsults && (
                    <tr className={styles.error}>
                        <td colSpan={8}>
                            {notConsults}
                        </td>
                    </tr>
                )}
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
                        <td>{consul.returnconsult}</td>
                    </tr>
                ))}
                {consults.length !== 0 && (
                    <tr>
                        <td className={`${styles.printtd} ${styles['no-print']}`} colSpan={8}>
                            <button title='Imprimir' type='button' onClick={handlePrint}>
                                <Icon icon={'fa-solid fa-print'} />
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};